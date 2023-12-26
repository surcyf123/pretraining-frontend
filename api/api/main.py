from fastapi import FastAPI
from typing import Dict
import json
import uvicorn
import bittensor

app = FastAPI()
metagraphs: Dict[int, bittensor.metagraph] = dict()

def get_from_cache(netuid: int = 0):
    metagraph = metagraphs.get(netuid)
    if metagraph is None:
        metagraph = bittensor.metagraph(netuid)
        metagraphs[netuid] = metagraph
    else:
        metagraph.sync()
    return metagraph

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/metagraph/{netuid}")
def metagraph(netuid: int = 0):
    metagraph = get_from_cache(netuid)
    return metagraph

@app.get("/metadata/{netuid}")
def metadata(netuid: int = 0):
    metagraph = get_from_cache(netuid)
    return json.dumps(metagraph.metadata)

@app.get("/weights/{netuid}")
def weights(netuid: int = 0):
    metagraph = get_from_cache(netuid)
    return json.dumps(metagraph.weights)

def start():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True, loop="asyncio") # Ref: Why asyncio loop? https://youtrack.jetbrains.com/issue/PY-57332

def serve():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000)          