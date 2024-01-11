from os import path, getcwd
from simplejson import dump


def dumpData(filename: str, data: dict):
    outputPath = path.join(getcwd(), "databank", filename)
    with open(outputPath, "w") as f:
        dump(data, f, indent=2, ignore_nan=True)
