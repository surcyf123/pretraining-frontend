from os import path, getcwd
from simplejson import dump
from pandas import Series
from json import loads
from math import isnan, isinf
from datetime import datetime
from functools import reduce


def dumpData(filename: str, data: dict):
    outputPath = path.join(getcwd(), "data-bank", filename)
    with open(outputPath, "w") as f:
        dump(data, f, indent=2, ignore_nan=True)


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


def reducer(value: dict) -> dict:
    acc, curr, key = value["acc"], value["curr"], value["key"]
    item = curr[key]
    if item in acc:
        acc[item].append(curr)
    else:
        acc[item] = [curr]
    return acc

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
