from os import path, getcwd
from simplejson import dump


def dumpData(filename: str, data: dict):
    outputPath = path.join(getcwd(), "data-bank", filename)
    with open(outputPath, "w") as f:
        dump(data, f, indent=2, ignore_nan=True)
