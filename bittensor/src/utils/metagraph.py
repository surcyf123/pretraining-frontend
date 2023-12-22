import bittensor as bt
import pandas as pd

# Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html#bittensor.metagraph.metagraph

# TODO: refactor logic for getting subnets
BatchSize = 2
subnets = list(range(0,33,BatchSize))

def get_metagraph_data():
  subnetData = {}
  subnetMetaGraphMetadata = {}
  for i in subnets:
    subnet_batch = list(range(i, min(i + BatchSize, 33)))
    for subnet in subnet_batch:
      metagraph = bt.metagraph(netuid = subnet, sync = True, lite = False)
      subnetMetaGraphMetadata[f"subnet-{subnet}"] = metagraph.metadata()
      neuron_data = {
        "uid": metagraph.uids.tolist(),
        "stake": metagraph.S.tolist(),
        "rank": metagraph.R.tolist(),
        "incentive": metagraph.I.tolist(),
        "emission": metagraph.E.tolist(),
        "consensus": metagraph.C.tolist(),
        "trust": metagraph.T.tolist(),
        "validatorTrust": metagraph.Tv.tolist(),
        "dividends": metagraph.D.tolist(),
        "bonds": metagraph.B.tolist(),
        "weight": metagraph.W.tolist(),
        "hotkey": metagraph.hotkeys,
        "coldkey": metagraph.coldkeys,
        "address": metagraph.addresses
      }
      max_length = max(len(values) for values in neuron_data.values())
      neuron_data["subnet"] = [subnet] * max_length
      updated_dictionary = {key: items + [None] * (max_length - len(items)) for key, items in neuron_data.items()} # normalize the items to have same length.
      output = pd.DataFrame(updated_dictionary).to_dict(orient="records") # convert to row wise data
      subnetData[f"subnet-{subnet}"] = output
  return {
    subnetData,
    subnetMetaGraphMetadata
  }
