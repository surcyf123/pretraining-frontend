from torch import sigmoid, FloatTensor
from typing import Union
from os import path, getcwd
from json import load
from fastapi import HTTPException


# Ref: https://docs.bittensor.com/emissions#trust
def calculateTrust(
    weight: FloatTensor, stake: FloatTensor, threshold: int = 0
) -> FloatTensor:
    thresholdMatrix = (weight > threshold).float()
    return thresholdMatrix.T @ stake


# Ref: https://docs.bittensor.com/emissions#trust
def calculateRank(weight: FloatTensor, stake: FloatTensor) -> FloatTensor:
    rank = weight.T @ stake
    return rank / rank.sum()


# Ref: https://docs.bittensor.com/emissions#trust
def calculateConsensus(
    trust: FloatTensor, kappa: float = 0.5, rho: int = 10
) -> FloatTensor:
    return sigmoid(rho * (trust - kappa))


# Ref: https://docs.bittensor.com/emissions#trust
def calculateEmission(consensus: FloatTensor, rank: FloatTensor) -> FloatTensor:
    emission = consensus * rank
    return emission / emission.sum()


def convertToFloat(value) -> Union[float, str]:
    output = value
    try:
        output = float(value)
    except (ValueError, TypeError):
        output = value
    finally:
        return output


def getSubnetLabels() -> dict:
    return {
        "00": "Root",
        "01": "Text Prompting",
        "02": "Machine Transation",
        "03": "Data Scraping",
        "04": "Multi Modality",
        "05": "Image Generation",
        "06": "Unknown",
        "07": "Storage",
        "08": "Time Series Prediction",
        "09": "Pretraining",
        "10": "Map Reduce",
        "11": "Text Training",
        "12": "Unknown",
        "13": "Dataverse",
        "14": "LLM Defender",
        "15": "Blockchain Insights",
        "16": "Audio",
        "17": "Petal",
        "18": "Cortex.t",
        "19": "Vision",
        "20": "Unknown",
        "21": "Filetao",
        "22": "Unknown",
        "23": "Prime-Net",
        "24": "Unknown",
        "25": "Bitcurrent",
        "26": "Image Alchemy",
        "27": "Compute",
        "28": "ZK Tensor",
        "29": "3D Gen",
        "30": "Lovelace",
        "31": "Game of Life",
        "32": "Roleplay",
    }


def loadMetagraphData(netUID: int) -> dict:
    metagraphFilePath = path.join(
        getcwd(), "data-bank", f"metagraph-data-{netUID}.json"
    )
    try:
        with open(metagraphFilePath, "r") as file:
            data = load(file)
        return data
    except FileNotFoundError:
        # Ref: https://fastapi.tiangolo.com/tutorial/handling-errors/?h=error#raise-an-httpexception-in-your-code
        raise HTTPException(
            status_code=404, detail=f"Metagraph data with netuid {netUID} not found."
        )
