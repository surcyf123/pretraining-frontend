from torch import sigmoid, FloatTensor
from wandb import login, Api

login()
WandbApi = Api()
ProjectName = "pretraining-subnet"
EntityName = "opentensor-dev"


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


def fetchRuns() -> WandbApi.runs:
    runs = WandbApi.runs(
        f"{EntityName}/{ProjectName}",
        filters={
            "display_name": {
                "$regex": "^validator.*"  # Ref: https://stackoverflow.com/a/3483399
            }
        },
    )
    return runs
