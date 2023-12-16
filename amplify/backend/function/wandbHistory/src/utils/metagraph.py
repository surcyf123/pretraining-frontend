import bittensor as bt

def get_metagraph_data():
  metagraph = bt.metagraph(9)
  return metagraph.metadata()
