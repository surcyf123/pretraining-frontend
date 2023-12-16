import bittensor as bt

# Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html
metagraph = bt.metagraph(netuid=9, sync=True)  # Keeping default network "finey" Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html#bittensor.metagraph.metagraph

def get_metagraph_data():
  metagraph_data={
  "metaData":metagraph.metadata(),
  "each_neuron_stake":metagraph.S, # Ref: https://docs.bittensor.com/python-api/html/autoapi/bittensor/metagraph/index.html#bittensor.metagraph.metagraph.S
  "each_neuron_ranks":metagraph.R,
  "each_neuron_incentives":metagraph.I,
  "each_neuron_emission":metagraph.E,
  "each_neuron_consensus":metagraph.C,
  "each_neuron_trust":metagraph.T,
  "each_neuron_validator_trust":metagraph.Tv,
  "each_neuron_dividends":metagraph.D,
  "bonds":metagraph.B,
  "each_neuron_weight":metagraph.W,
  "each_neuron_hotkeys":metagraph.hotkeys,
  "each_neuron_coldkeys":metagraph.coldkeys,
  }

  return metagraph_data

