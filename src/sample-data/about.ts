export const AboutData = {
  introTitle: "Introduction",
  introDescription:
    "Bittensor subnet 9 rewards miners (engineers etc) for producing pretrained Foundation-Models on the Falcon Refined Web dataset. It acts like a continuous benchmark whereby miners are rewarded for attaining the best losses on randomly sampled pages of Falcon given a consistent model architecture. The reward mechanism works as follows:",
  introList: [
    "Miners train and periodically host trained model weights linked to their miner key as exampled by the code in neurons/miner.py.",
    "Validators run a continuous eval on the hosted models, performing the validation system outlined in neurons/validator.py and setting weights to the chain based on the performance of each miner on the Falcon dataset.",
    "The chain aggregates weights from all active validators and runs Yuma Consensus to determine the proportion of TAO emission rewarded to miners and validators.",
  ],
};
