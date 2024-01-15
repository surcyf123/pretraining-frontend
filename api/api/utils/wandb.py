from wandb import login, Api
from pandas import Series, DataFrame
from json import loads, load
from datetime import datetime, timedelta
from math import nan, isnan, isinf
from numpy import concatenate
from functools import reduce
from os import getcwd, path
from fastapi import HTTPException

login()
WandbApi = Api()
ProjectName = "pretraining-subnet"
EntityName = "opentensor-dev"


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


def extractOriginalFormatData(runs: WandbApi.runs):
    validatorRunData = {}
    for run in runs:
        runData = run.history()
        if "original_format_json" in runData.columns:
            originalFormatJsonData = runData["original_format_json"]
            convertedData = []
            if isinstance(originalFormatJsonData, Series):
                targetList = originalFormatJsonData.to_list()
                for ele in targetList:
                    if isinstance(ele, str):
                        convertedData.append(loads(ele))
                    else:
                        convertedData.append(ele)
            else:
                convertedData = originalFormatJsonData
            validatorRunData[run.name] = convertedData
    return validatorRunData


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


def transformValidatorRuns(runs: WandbApi.runs):
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


def filterRecentValidatorRun(runs: dict) -> dict:
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


def fetchValidatorRuns(days: int) -> dict:
    runs = WandbApi.runs(
        f"{EntityName}/{ProjectName}",
        filters={
            "created_at": {
                "$gte": (datetime.now() - timedelta(days=days)).strftime(
                    "%Y-%m-%dT%H:%M:%S"
                )  # fetch data for previous n days
            },
            "display_name": {"$regex": "^validator-(\d+)-(\d+)-(\d+)-(\d+)_.+$"},
        },
    )
    originalFormatJsonData = extractOriginalFormatData(runs)
    filteredRuns = filterRecentValidatorRun(originalFormatJsonData)
    updatedData = calculateBestAverageLoss(filteredRuns)
    return updatedData


def filterNDaysValidatorData(data: dict, days: int) -> dict:
    output = {}
    prevtimestamp = (datetime.now() - timedelta(days=days)).timestamp()
    for validatorID, values in data.items():
        output[validatorID] = list(
            filter(lambda x: x["timestamp"] >= prevtimestamp, values)
        )
    return output


def loadValidatorRuns(days: int) -> dict:
    validatorRunsFilepath = path.join(getcwd(), "data-bank", "validator-runs.json")
    try:
        with open(validatorRunsFilepath, "r") as file:
            data = load(file)
            nDaysData = filterNDaysValidatorData(data, days)
            filteredRuns = filterRecentValidatorRun(nDaysData)
            updatedData = calculateBestAverageLoss(filteredRuns)
        return updatedData
    except FileNotFoundError:
        # Ref: https://fastapi.tiangolo.com/tutorial/handling-errors/?h=error#raise-an-httpexception-in-your-code
        raise HTTPException(
            status_code=404, detail="Validator-runs.json File not found."
        )
