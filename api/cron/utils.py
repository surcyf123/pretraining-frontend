from os import path, getcwd
from simplejson import dump, loads
from pandas import Series


def dumpData(filename: str, data: dict):
    outputPath = path.join(getcwd(), "data-bank", filename)
    with open(outputPath, "w") as f:
        dump(data, f, indent=2, ignore_nan=True)


def extractOriginalFormatData(runs):
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
