from fastapi import FastAPI
import uvicorn
import bittensor

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/metagraphs/{netuid}")
def metagraph(netuid: int = 0):
    return bittensor.metagraph(netuid).metadata

def start():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True, loop="asyncio") # Ref: Why asyncio loop? https://youtrack.jetbrains.com/issue/PY-57332

def serve():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000)          