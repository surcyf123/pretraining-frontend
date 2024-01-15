from os import path, getcwd
from simplejson import dump
from pandas import Series
from json import loads


def dumpData(filename: str, data: dict):
    outputPath = path.join(getcwd(), "data-bank", filename)
    with open(outputPath, "w") as f:
        dump(data, f, indent=2, ignore_nan=True)


def formatRuns(runs):
    output = {}
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
            output[run.name] = convertedData
    return output
