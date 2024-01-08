from wandb import login, Api
from pandas import Series
from json import loads
from datetime import datetime, timedelta
from pandas import DataFrame
from math import nan

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
                if isinstance(currentUIDData, dict):
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
                    "timestamp": item.get("timestamp", nan) * 1000 , # Convert 'sec' to 'ms' for 'js'.
                }
            )
    return output


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
    updatedData = calculateBestAverageLoss(originalFormatJsonData)
    return updatedData
