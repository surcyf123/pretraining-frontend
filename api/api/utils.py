from torch import FloatTensor, Tensor


# Ref: https://docs.bittensor.com/emissions#trust
def calculate_trust(W: FloatTensor, S:Tensor, threshold: int = 0)->Tensor:
    Wn = (W > threshold).float()
    return Wn.T @ S
