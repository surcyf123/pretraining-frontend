import bittensor as bt
import pandas as pd

# Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html
metagraph = bt.metagraph(netuid=9, sync=True,lite=False)  # Keeping default network "finey" Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html#bittensor.metagraph.metagraph

def get_metagraph_data():
  metadata = metagraph.metadata(),
  neuron_data = {
  "each_neuron_stake": metagraph.S.tolist(), # Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html#bittensor.metagraph.metagraph.S
  "each_neuron_ranks": metagraph.R.tolist(),
  "each_neuron_incentives": metagraph.I.tolist(),
  "each_neuron_emission": metagraph.E.tolist(),
  "each_neuron_consensus": metagraph.C.tolist(),
  "each_neuron_trust": metagraph.T.tolist(),
  "each_neuron_validator_trust": metagraph.Tv.tolist(),
  "each_neuron_dividends": metagraph.D.tolist(),
  "bonds": metagraph.B.tolist(),
  "each_neuron_weight": metagraph.W.tolist(),
  "each_neuron_hotkeys": metagraph.hotkeys,
  "each_neuron_coldkeys": metagraph.coldkeys,
  }

  output = pd.DataFrame(neuron_data).to_dict(orient="records") # transform data to array of records

  return {
    "metadata": metadata,
    "neuron_data": output
  }
