from wandb import login, Api
from pandas import Series
from json import loads

login()
WandbApi = Api()
ProjectName = "pretraining-subnet"
EntityName = "opentensor-dev"


def extractOriginalFormatData(runs: WandbApi.runs):
    validatorRunData = {}
    for run in runs:
        runData = run.history()
        if "original_format_json" in runData.columns:
            originalFormatJsonData = runData["original_format_json"]
            if isinstance(originalFormatJsonData, Series):
                convertedData = []
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


def fetchValidatorRuns() -> dict:
    runs = WandbApi.runs(
        f"{EntityName}/{ProjectName}",
        filters={"display_name": {"$regex": "^validator-(\d+)-(\d+)-(\d+)-(\d+)_.+$"}},
    )
    originalFormatJsonData = extractOriginalFormatData(runs)
    return originalFormatJsonData
