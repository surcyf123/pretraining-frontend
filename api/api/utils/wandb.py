from pandas import DataFrame
from json import load
from datetime import datetime, timedelta
from math import nan
from numpy import concatenate
from functools import reduce
from os import getcwd, path
from fastapi import HTTPException
from cron.utils import reducer, isValidUIDItem


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


def extractUIDs(runData: dict):
    runs = list(
        filter(lambda x: x is not None, concatenate(list(runData.values())))
    )  # Ref: https://numpy.org/doc/stable/reference/generated/numpy.concatenate.html
    uids = concatenate([list(item["uid_data"].values()) for item in runs])
    filteredUIDs = list(filter(isValidUIDItem, uids))
    sortedUIDs = sorted(
        filteredUIDs, key=lambda x: x["block"], reverse=True
    )  # sort in descending order

    groups = reduce(
        lambda acc, curr: reducer({"acc": acc, "curr": curr, "key": "uid"}),
        sortedUIDs,
        {},
    )
    output = [group[0] for group in groups.values()]  # first element of every uid
    return output


def filterValidatorRuns(data: dict, days: int) -> dict:
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
        return filteredRuns
    except FileNotFoundError:
        # Ref: https://fastapi.tiangolo.com/tutorial/handling-errors/?h=error#raise-an-httpexception-in-your-code
        raise HTTPException(status_code=404, detail="Validator runs not found.")
