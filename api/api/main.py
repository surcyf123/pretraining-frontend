from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pandas import DataFrame, concat
import uvicorn
from torch import FloatTensor
from CacheToolsUtils import cachetools, cached
from .utils.metagraph import (
    calculateTrust,
    calculateRank,
    calculateEmission,
    calculateConsensus,
    getSubnetLabels,
    convertToFloat,
    loadMetagraphData,
)
from .utils.wandb import (
    loadValidatorRuns,
    transformValidatorRuns,
    smoothBestAverageLoss,
    extractUIDs,
)
from requests import get
from simplejson import dumps, loads

BaseMEXCEndpoint = "https://api.mexc.com"
app = FastAPI()
origins = [
    "http://localhost:8080",
    "https://www.openpretrain.ai",
]  # Why? https://fastapi.tiangolo.com/tutorial/cors/
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"Hello": "Bittensor"}


@app.get("/metadata/{netuid}")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def metadata(netuid: int = 0):
    metagraphData = loadMetagraphData(netuid)
    return metagraphData["metadata"]


@app.get("/neurons/{netuid}")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def neurons(netuid: int = 0):
    metagraphData = loadMetagraphData(netuid)
    records = metagraphData["neurons"]
    df = DataFrame(records)
    df["rewards"] = df["emission"].apply(lambda x: x * 72 / 1000000000)
    output = df.to_dict(orient="records")  # transform data to array of records
    return output


@app.get("/validators")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def validators():
    delegates = get(
        "https://raw.githubusercontent.com/opentensor/bittensor-delegates/main/public/delegates.json"
    ).json()
    metagraphData = loadMetagraphData(0)
    records = {
        "uid": metagraphData["neurons"]["uid"],
        "stake": metagraphData["neurons"]["stake"],
        "hotkey": metagraphData["neurons"]["hotkey"],
        "coldkey": metagraphData["neurons"]["coldkey"],
        "address": metagraphData["neurons"]["address"],
    }
    records_df = DataFrame(records)
    weights_df = DataFrame(metagraphData["weights"])
    df = concat([records_df, weights_df], axis=1)
    validatorData = df.to_dict(orient="records")  # transform data to array of records
    output = list(map(lambda x: {**x, **delegates.get(x["hotkey"], {})}, validatorData))
    return output


@app.get("/weights/{netuid}")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def weights(netuid: int = 0, threshold: int = 20000):
    metagraphData = loadMetagraphData(netuid)
    df = DataFrame(
        {
            "weights": metagraphData["weights"],
            "stake": metagraphData["neurons"]["stake"],
            "uid": metagraphData["neurons"]["uid"],
        }
    )
    filteredDataFrame = df[df["stake"] > threshold]
    records = filteredDataFrame.to_dict(orient="records")
    output = [
        {"validatorID": record["uid"], "minerID": m_id, "weight": weight}
        for record in records
        for m_id, weight in enumerate(record["weights"])
    ]
    return output


@app.get("/bonds/{netuid}")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def bonds(netuid: int = 0):
    metagraphData = loadMetagraphData(netuid)
    return metagraphData["bonds"]


@app.get("/average-validator-trust/{netuid}")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def average_validator_trust(netuid: int = 0):
    metagraphData = loadMetagraphData(netuid)
    records = {
        "stake": metagraphData["neurons"]["stake"],
        "validatorTrust": metagraphData["validatorTrust"],
    }
    df = DataFrame(records)
    filtered_df = df[df["stake"] > 20000]
    average = filtered_df["validatorTrust"].mean()
    return average


@app.get("/vitals")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def vitals():
    subnetLabels = getSubnetLabels()
    metagraphData = loadMetagraphData(0)
    weights = FloatTensor(metagraphData["weights"])
    stake = FloatTensor(metagraphData["neurons"]["stake"])
    normalizedStake = (stake / stake.sum()).clone().float()
    trust = calculateTrust(weights, normalizedStake)
    rank = calculateRank(weights, normalizedStake)
    consensus = calculateConsensus(trust)
    emission = calculateEmission(consensus, rank)
    df = DataFrame(
        {
            "emission": metagraphData["subnetEmission"],
            "netUID": subnetLabels.keys(),
            "label":subnetLabels.values(),
            "trust": trust.tolist(),
            "rank": rank.tolist(),
            "consensus": consensus.tolist(),
            "calculatedEmission": emission.tolist(),
        }
    )
    vitals = df.to_dict(orient="records")
    return vitals


@app.get("/tao/price-change-stats")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def taoPriceChangeStats():
    stats = get(
        f"{BaseMEXCEndpoint}/api/v3/ticker/24hr", params={"symbol": "TAOUSDT"}
    ).json()
    parsedStats = {key: convertToFloat(value) for key, value in stats.items()}
    return parsedStats


@app.get("/tao/price")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def taoTickerPrice():
    price = get(
        f"{BaseMEXCEndpoint}/api/v3/ticker/price", params={"symbol": "TAOUSDT"}
    ).json()
    parsedPrice = {key: convertToFloat(value) for key, value in price.items()}
    return parsedPrice


@app.get("/tao/average-price")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def taoAveragePrice():
    averagePrice = get(
        f"{BaseMEXCEndpoint}/api/v3/avgPrice", params={"symbol": "TAOUSDT"}
    ).json()
    parsedAveragePrice = {
        key: convertToFloat(value) for key, value in averagePrice.items()
    }
    return parsedAveragePrice


@app.get("/tao/candlestick")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def taoCandlestick():
    candlestick = get(
        f"{BaseMEXCEndpoint}/api/v3/klines",
        params={"symbol": "TAOUSDT", "interval": "1m"},
    ).json()
    convertedData = [[convertToFloat(item) for item in items] for items in candlestick]
    return convertedData


@app.get("/wandb/validator-runs/{days}")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def validatorRuns(days: int = 30):
    runs = loadValidatorRuns(days)
    uids = extractUIDs(runs)
    parsedRuns = loads(
        dumps(uids, indent=2, ignore_nan=True)
    )  # To parse NaN and Infinity to null
    return parsedRuns


@app.get("/wandb/line-chart/{days}")
@cached(cache=cachetools.TTLCache(maxsize=33, ttl=10 * 60))
def lineChartData(days: int = 30):
    runs = loadValidatorRuns(days)
    transformedData = transformValidatorRuns(runs)
    smoothedBestAverageLoss = smoothBestAverageLoss(transformedData)
    parsedRuns = loads(
        dumps(smoothedBestAverageLoss, indent=2, ignore_nan=True)
    )  # To parse NaN and Infinity to null
    return parsedRuns


def start():
    uvicorn.run(
        "api.main:app", host="0.0.0.0", port=8000, reload=True, loop="asyncio"
    )  # Ref: Why asyncio loop? https://youtrack.jetbrains.com/issue/PY-57332


def serve():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000)
