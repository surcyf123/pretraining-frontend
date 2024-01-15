from pandas import DataFrame
from json import load
from datetime import datetime, timedelta
from math import nan, isnan, isinf
from numpy import concatenate
from functools import reduce
from os import getcwd, path
from fastapi import HTTPException


def smoothBestAverageLoss(data):
    df = DataFrame(data).sort_values("timestamp")
    groupedData = df.groupby("key")
    # https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rolling.html
    df["smoothed_best_average_loss"] = (
        groupedData["best_average_loss"]
        .rolling(
            window=40,  # Window size.
            min_periods=10,  # Minimum entries required to calculate data.
        )
        .mean()
        .reset_index(0, drop=True)
    )  # drop the index column
    output = df.to_dict(orient="records")
    return output


def calculateBestAverageLoss(data: dict) -> dict:
    output = data
    for validatorID, validatorInfo in data.items():
        for index, item in enumerate(validatorInfo):
            uids = item.get("uids", [])
            uidData = item.get("uid_data", {})
            averageLosses = []
            for uid in uids:
                currentUIDData = uidData.get(str(uid), None)
                if isValidUIDItem(currentUIDData) == True:
                    averageLoss = currentUIDData.get("average_loss", None)
                    averageLosses.append(averageLoss)
            if len(averageLosses) > 0:
                bestAverageLoss = min(averageLosses)
                output[validatorID][index]["best_average_loss"] = bestAverageLoss
    return output


def transformValidatorRuns(runs: dict):
    output = []
    for validatorID, validatorInfo in runs.items():
        for item in validatorInfo:
            output.append(
                {
                    "key": validatorID,
                    "best_average_loss": item.get("best_average_loss", None),
                    "timestamp": item.get("timestamp", nan)
                    * 1000,  # Convert 'sec' to 'ms' for 'js'.
                }
            )
    return output


def isValidUIDItem(item) -> bool:
    output = True
    if item["block"] is None or isnan(item["block"]) or isinf(item["block"]):
        output = False
    elif (
        item["average_loss"] is None
        or isnan(item["average_loss"])
        or isinf(item["average_loss"])
    ):
        output = False
    return output


def reducer(value: dict) -> dict:
    acc, curr, key = value["acc"], value["curr"], value["key"]
    item = curr[key]
    if item in acc:
        acc[item].append(curr)
    else:
        acc[item] = [curr]
    return acc


def extractUIDs(runData: dict):
    runs = list(
        filter(lambda x: x is not None, concatenate(list(runData.values())))
    )  # Ref: https://numpy.org/doc/stable/reference/generated/numpy.concatenate.html
    uids = concatenate([list(item["uid_data"].values()) for item in runs])
    sortedUIDs = list(
        filter(isValidUIDItem, sorted(uids, key=lambda x: x["block"], reverse=True))
    )  # sort in descending order
    groups = reduce(
        lambda acc, curr: reducer({"acc": acc, "curr": curr, "key": "uid"}),
        sortedUIDs,
        {},
    )
    output = [group[0] for group in groups.values()]  # first element of every uid
    return output


def parseRunID(runID: str) -> dict:
    segments = runID.split("_")  # ["validator-id-year-month-date","hours-minutes-sec"]
    id, year, month, date = segments[0].split("-")[1:]
    timestamp = f"{date}-{month}-{year}-{segments[1]}"
    parsedTimestamp = datetime.strptime(timestamp, "%d-%m-%Y-%H-%M-%S").timestamp()
    return {"timestamp": parsedTimestamp, "validatorID": id}


def createRunID(value: dict) -> str:
    validatorID = f"validator-{value['validatorID']}"
    formattedTimestamp = datetime.fromtimestamp(value["timestamp"]).strftime(
        "%Y-%m-%d_%H-%M-%S"
    )
    return f"{validatorID}-{formattedTimestamp}"


def filterLatestRuns(runs: dict) -> dict:
    parsedRunIDs = [parseRunID(key) for key in runs.keys()]
    sortedResults = sorted(parsedRunIDs, key=lambda x: x["timestamp"], reverse=True)
    groups = reduce(
        lambda acc, curr: reducer({"acc": acc, "curr": curr, "key": "validatorID"}),
        sortedResults,
        {},
    )
    filteredRunIDs = [createRunID(value[0]) for value in groups.values()]
    filteredRuns = {key: runs[key] for key in filteredRunIDs}
    return filteredRuns


def filterNDaysValidatorData(data: dict, days: int) -> dict:
    output = {}
    threshold = (datetime.now() - timedelta(days=days)).timestamp()
    for validatorID, values in data.items():
        output[validatorID] = list(
            filter(lambda x: x["timestamp"] >= threshold, values)
        )
    return output


def loadValidatorRuns(days: int) -> dict:
    validatorRunsFilepath = path.join(getcwd(), "data-bank", "validator-runs.json")
    try:
        with open(validatorRunsFilepath, "r") as file:
            validatorRuns = load(file)
            filteredRuns = filterValidatorRuns(validatorRuns, days)
            recentRuns = filterLatestRuns(filteredRuns)
            updatedRuns = calculateBestAverageLoss(recentRuns)
        return updatedRuns
    except FileNotFoundError:
        # Ref: https://fastapi.tiangolo.com/tutorial/handling-errors/?h=error#raise-an-httpexception-in-your-code
        raise HTTPException(
            status_code=404, detail="Validator runs not found."
        )
