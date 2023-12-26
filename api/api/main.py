from fastapi import FastAPI
from typing import Dict
from pandas import DataFrame
import uvicorn
import bittensor

app = FastAPI()
metagraphs: Dict[int, bittensor.metagraph] = dict()

def get_from_cache(netuid: int = 0):
    metagraph = metagraphs.get(netuid)
    if metagraph is None:
        metagraph = bittensor.metagraph(netuid, lite=False, network='local')
        metagraphs[netuid] = metagraph
    else:
        metagraph.sync()
    return metagraph

@app.get("/")
def root():
    return {"Hello": "Bittensor"}

@app.get("/metadata/{netuid}")
def metadata(netuid: int = 0):
    metagraph = get_from_cache(netuid)
    return metagraph.metadata()

@app.get("/neurons/{netuid}")
def neurons(netuid: int = 0):
    metagraph = get_from_cache(netuid)
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
        "address": metagraph.addresses
    }
    df = DataFrame(records)
    df['rewards'] = df['emission'].apply(lambda x: x * 72 / 1000000000)
    output = df.to_dict(orient="records") # transform data to array of records
    return output

@app.get("/weights/{netuid}")
def weights(netuid: int = 0):
    metagraph = get_from_cache(netuid)
    return metagraph.W.tolist()    

@app.get("/bonds/{netuid}")
def bonds(netuid: int = 0):
    metagraph = get_from_cache(netuid)
    return metagraph.B.tolist()    

def start():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True, loop="asyncio") # Ref: Why asyncio loop? https://youtrack.jetbrains.com/issue/PY-57332

def serve():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000)          