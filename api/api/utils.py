from torch import FloatTensor, Tensor


# Ref: https://docs.bittensor.com/emissions#trust
def calculate_trust(W: FloatTensor, S: FloatTensor, threshold: int = 0) -> Tensor:
    Sn = (S/ S.sum()).clone().float()
    Wn = (W > threshold).float()
    return Wn.T @ Sn
