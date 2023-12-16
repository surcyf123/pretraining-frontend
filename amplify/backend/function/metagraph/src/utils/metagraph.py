import bittensor as bt

# Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html
metagraph = bt.metagraph(netuid=9, sync=True)  # Keeping default network "finey" Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html#bittensor.metagraph.metagraph

def get_metagraph_data():
  metagraph_data={
  "metaData":metagraph.metadata(),
  # "each_neuron_stake":metagraph.S, # Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html#bittensor.metagraph.metagraph.S
  "each_neuron_ranks":metagraph.R.tolist(),
  "each_neuron_incentives":metagraph.I.tolist(),
  "each_neuron_emission":metagraph.E.tolist(),
  "each_neuron_consensus":metagraph.C.tolist(),
  "each_neuron_trust":metagraph.T.tolist(),
  "each_neuron_validator_trust":metagraph.Tv.tolist(),
  "each_neuron_dividends":metagraph.D.tolist(),
  "bonds":metagraph.B.tolist(),
  "each_neuron_weight":metagraph.W.tolist(),
  "each_neuron_hotkeys":metagraph.hotkeys,
  "each_neuron_coldkeys":metagraph.coldkeys,
  }

  return metagraph_data

