from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from pandas import DataFrame, concat
import uvicorn
import bittensor
from CacheToolsUtils import cachetools, cached
from .utils import calculateTrust, calculateRank, calculateEmission, calculateConsensus

app = FastAPI()
cache = cachetools.TTLCache(
    maxsize=33, ttl=10 * 60
)  # ttl in seconds; maxsize is number of items
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

metagraphs: Dict[int, bittensor.metagraph] = dict()


@app.get("/")
def root():
    return {"Hello": "Bittensor"}


@app.get("/metadata/{netuid}")
@cached(cache=cache)
def metadata(netuid: int = 0):
    metagraph = bittensor.metagraph(netuid, lite=False, network="local", sync=True)
    return metagraph.metadata()


@app.get("/neurons/{netuid}")
@cached(cache=cache)
def neurons(netuid: int = 0):
    metagraph = bittensor.metagraph(netuid, lite=False, network="local", sync=True)
    records = {
        "uid": metagraph.uids.tolist(),
        "stake": metagraph.S.tolist(),
        "rank": metagraph.R.tolist(),
        "incentive": metagraph.I.tolist(),
        "emission": metagraph.E.tolist(),
        "consensus": metagraph.C.tolist(),
        "trust": metagraph.T.tolist(),
        "validatorTrust": metagraph.Tv.tolist(),
        "dividends": metagraph.D.tolist(),
        "hotkey": metagraph.hotkeys,
        "coldkey": metagraph.coldkeys,
        "address": metagraph.addresses,
    }
    df = DataFrame(records)
    df["rewards"] = df["emission"].apply(lambda x: x * 72 / 1000000000)
    output = df.to_dict(orient="records")  # transform data to array of records
    return output


@app.get("/validators")
@cached(cache=cache)
def validators():
    metagraph = bittensor.metagraph(0, lite=False, network="local", sync=True)
    records = {
        "uid": metagraph.uids.tolist(),
        "stake": metagraph.S.tolist(),
        "hotkey": metagraph.hotkeys,
        "coldkey": metagraph.coldkeys,
        "address": metagraph.addresses,
    }
    records_df = DataFrame(records)
    weights_df = DataFrame(metagraph.W.tolist())
    df = concat([records_df, weights_df], axis=1)
    output = df.to_dict(orient="records")  # transform data to array of records
    return output


@app.get("/weights/{netuid}")
@cached(cache=cache)
def weights(netuid: int = 0):
    metagraph = bittensor.metagraph(netuid, lite=False, network="local", sync=True)
    weight_matrix = metagraph.W.tolist()
    formatted_weight_matrix = [
        {"validatorID": v_id, "weight": weight, "minerID": m_id}
        for v_id, miners in enumerate(weight_matrix)
        for m_id, weight in enumerate(miners)
    ]
    return formatted_weight_matrix


@app.get("/bonds/{netuid}")
@cached(cache=cache)
def bonds(netuid: int = 0):
    metagraph = bittensor.metagraph(netuid, lite=False, network="local", sync=True)
    return metagraph.B.tolist()


@app.get("/average-validator-trust/{netuid}")
@cached(cache=cache)
def average_validator_trust(netuid: int = 0):
    metagraph = bittensor.metagraph(netuid, lite=False, network="local", sync=True)
    records = {
        "stake": metagraph.S.tolist(),
        "validatorTrust": metagraph.Tv.tolist(),
    }
    df = DataFrame(records)
    filtered_df = df[df["stake"] > 20000]
    average = filtered_df["validatorTrust"].mean()
    return average


@app.get("/vitals")
@cached(cache=cache)
def vitals():
    metagraph = bittensor.metagraph(0, lite=False, network="finney", sync=True)
    weights = metagraph.W.float()
    normalizedStake = (metagraph.S / metagraph.S.sum()).clone().float()

    trust = calculateTrust(weights, normalizedStake)
    rank = calculateRank(weights, normalizedStake)
    consensus = calculateConsensus(trust)
    emission = calculateEmission(consensus, rank)
    df = DataFrame(
        {
            "trust": trust.tolist(),
            "rank": rank.tolist(),
            "consensus": consensus.tolist(),
            "emission": emission.tolist(),
        }
    )
    vitals = df.to_dict(orient="records")
    return vitals


def start():
    uvicorn.run(
        "api.main:app", host="0.0.0.0", port=8000, reload=True, loop="asyncio"
    )  # Ref: Why asyncio loop? https://youtrack.jetbrains.com/issue/PY-57332


def serve():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000)
