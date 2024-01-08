from wandb import login, Api
from pandas import Series
from json import loads
from datetime import datetime, timedelta

login()
WandbApi = Api()
ProjectName = "pretraining-subnet"
EntityName = "opentensor-dev"


def extractOriginalFormatData(runs: WandbApi.runs):
    validatorRunData = {}
    for run in runs:
        print(run.name)
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


def fetchValidatorRuns() -> dict:
    runs = WandbApi.runs(
        f"{EntityName}/{ProjectName}",
        filters={
            "created_at": {
                "$gte": (datetime.now() - timedelta(days=30)).strftime(
                    "%Y-%m-%dT%H:%M:%S"
                )  # fetch data for previous 30 days
            },
            "display_name": {"$regex": "^validator-(\d+)-(\d+)-(\d+)-(\d+)_.+$"},
        },
    )
    originalFormatJsonData = extractOriginalFormatData(runs)
    updatedData = calculateBestAverageLoss(originalFormatJsonData)
    return updatedData
