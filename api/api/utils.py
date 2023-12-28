from torch import sigmoid, FloatTensor


# Ref: https://docs.bittensor.com/emissions#trust
def calculateTrust(W: FloatTensor, S: FloatTensor, threshold=0) -> FloatTensor:
    Wn = (W > threshold).float()
    return Wn.T @ S


# Ref: https://docs.bittensor.com/emissions#trust
def calculateRank(W: FloatTensor, S: FloatTensor) -> FloatTensor:
    R = W.T @ S
    return R / R.sum()


# Ref: https://docs.bittensor.com/emissions#trust
def calculateConsensus(
    T: FloatTensor, kappa: float = 0.5, rho: int = 10
) -> FloatTensor:
    return sigmoid(rho * (T - kappa))


# Ref: https://docs.bittensor.com/emissions#trust
def calculateEmission(C: FloatTensor, R: FloatTensor) -> FloatTensor:
    E = C * R
    return E / E.sum()
