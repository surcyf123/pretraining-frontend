import bittensor as bt
import pandas as pd

# Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html#bittensor.metagraph.metagraph
metagraph = bt.metagraph(netuid = 9, sync = True, lite = False)

def get_metagraph_data():
  metadata = metagraph.metadata(),
  
  neuron_data = {
  "uid":metagraph.uids,
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

  output = pd.DataFrame(neuron_data).to_dict(orient="records") # transform data to array of records

  return {
    "metadata": metadata,
    "neuronData": output
  }
