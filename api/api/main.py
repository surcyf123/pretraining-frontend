from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

def start():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)

def serve():
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000)          