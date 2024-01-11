from os import path, getcwd
import json
from simplejson import dump


def storeData(filename: str, data: dict):
    output_path = path.join(getcwd(), "databank", filename)
    with open(output_path, "w") as f:
        dump(data, f, indent=2, ignore_nan=True)
