import { Anchor, Code, Container, List, Pill, Stack, Text, Title } from "@mantine/core";

export function Home(): JSX.Element {
  return (
    <Container>
      <Stack gap="xl">
        <Title order={1}>Bittensor Pretrain Subnet</Title>
        <Text>
          Bittensor subnet 9 rewards miners (engineers etc) for producing pretrained
          Foundation-Models on the Falcon Refined Web dataset. It acts like a continuous benchmark
          whereby miners are rewarded for attaining the best losses on randomly sampled pages of
          Falcon given a consistent model architecture. The reward mechanism works as follows:
        </Text>
        <List spacing="xs" size="sm">
          <List.Item>
            Miners train and periodically host trained model weights linked to their miner key as
            exampled by the code in neurons/miner.py.
          </List.Item>
          <List.Item>
            Validators run a continuous eval on the hosted models, performing the validation system
            outlined in neurons/validator.py and setting weights to the chain based on the
            performance of each miner on the Falcon dataset.
          </List.Item>
          <List.Item>
            The chain aggregates weights from all active validators and runs Yuma Consensus to
            determine the proportion of TAO emission rewarded to miners and validators.
          </List.Item>
        </List>
        <Title order={1}>Pretraining</Title>
        <Text>
          Bittensor hosts multiple incentive mechanism through which miners are evaluated by
          validators for performing actions well. Validators perform the process of evaluation and{" "}
          {`'`}set weights{`'`}, which are transactions into Bittensor{`'`}s{" "}
          <Anchor
            href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fentrypoint-finney.opentensor.ai#/explorer"
            target="_blank"
          >
            blockchain
          </Anchor>
          . Each incentive mechanism in Bittensor is called a {`'`}subnet{`'`} and has an identifier
          (This particular mechanism has subnet uid 9). Weights and the amount of TAO held by the
          validators become inputs to Bittensor{`'`}s consensus mechanism called{" "}
          <Anchor
            href="https://github.com/opentensor/subtensor/blob/feature/consensus-readme/docs/consensus.md"
            target="_blank"
          >
            Yuma Consensus
          </Anchor>
          . YC drives validators towards a consensus, agreement about the value of the work done by
          miners. The miners with the highest agreed upon scores are minted TAO, the network digital
          currency. You can view this information{" "}
          <Anchor href="https://taostats.io/subnets/netuid-9/" target="_blank">
            here
          </Anchor>
          .
        </Text>
        <Text>
          Miners within this subnet are evaluated based on the number of times the model they have
          hosted has a lower loss than another model on the network when randomly sampling from the
          near infinite Falcon Refined Web pretraining dataset. To perform well, miners must attain
          the lowest loss on the largest number of random batches. All models are open and
          accessible via a{" "}
          <Anchor href="https://wandb.ai/opentensor-dev/pretraining-subnet" target="_blank">
            wandb project
          </Anchor>{" "}
          and this repo contains tools for downloading them, serving them to your miner, as well as
          getting data from validators about which models perform best on which pages of the Falcon
          Dataset. Finding the best model and delta at the earliest timestamp ensures the most
          incentive.
        </Text>
        <Text>
          You can view the entire validation system by reading the code in{" "}
          <Pill>neurons/validator.py</Pill>. Pseudocode for the validation system is as follows:
        </Text>
        <Code block>
          {`
                weights = zeros(256)
                while True:
                    # Fetch random sample of batches to evaluate models on
                    batches = get_random_sample_of_batches_from_falcon()
                    
                    # Fetch and or update models.
                    models = get_and_update_models_from_miners()

                    # Compute losses for each batch and each model
                    model_losses = {}
                    for model in models:
                        for batch in batches:
                            loss = get_loss_for_model_on_batch( model, batch )
                            model_losses[ model ].append( loss )

                    # Compute wins for models.
                    model_wins = {}
                    for model_a in models:
                        for model_b in models:
                            for i in len( batches )
                                # Determine if better model loss with timestamp boosting.
                                if iswin( model_losses[ model_a ][ i ], model_losses[ model_b ][ i ], timestamp_a, timestamp_b ):
                                    model_wins[ model_a ] += 1
                                        
                    # End epoch.
                    # Weights are computed based on the ratio of wins a model attains during the epoch.
                    for model_i in models:
                        weights[ model_i ] += model_wins[ model_i ] / sum( model_wins.values() )
                    weights = softmax( weights / temperature, dim=0 )

                    # Set weights on the chain.
                    set_weights( weight )
              `}
        </Code>
        <Text>
          The behaviour of <Pill>iswin(loss_a, loss_b, timestamp_a, timestamp_b)</Pill> function
          intentionally skews the win function to reward models which have been hosted earlier such
          that newer models are only better than others iff their loss is <Pill>epsilon</Pill>{" "}
          percent lower accoring to the following function. Currently <Pill>epsilon</Pill> is set to
          1% and is a hyper parameter of the mechanism
        </Text>
        <Code block>
          {`
              def iswin( loss_a, loss_b, timestamp_a, timestamp_b, epsilon ):
              loss_a = (1 - epsilon) * loss_a if timestamp_a < timestamp_b else loss_a
              loss_b = (1 - epsilon) * loss_b if timestamp_b < timestamp_a else loss_b
              if loss_a < loss_b: return True
              else: return False
              `}
        </Code>
        <Text>
          It is important to note that this affects the game theoretics of the incentive landscape
          since miners should only update their model (thus updating their timestamp to a newer
          date) if they have achieved an <Pill>epsilon</Pill> better loss on average on the Falcon
          Refined Web dataset than their previous model. This undermines the obvious optimal
          strategy for miners to copy the publicly available models from other miners. They can and
          should copy other miners, but they will always obtain fewer wins compared to them until
          they also decrease their loss by <Pill>epsilon</Pill>.
        </Text>

        <Title order={1}>Getting Started</Title>
        <Text>TL;DR:</Text>
        <List spacing="xs" size="sm">
          <List.Item>
            <Anchor href="https://discord.com/invite/bittensor" target="_blank">
              Chat
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="https://taostats.io/subnets/netuid-9/" target="_blank">
              Leaderboard
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="https://wandb.ai/opentensor-dev/pretraining-subnet" target="_blank">
              Wandb Runs
            </Anchor>
          </List.Item>
        </List>
        <Text>
          This repo{`'`}s main conversation is carried out in the Bittensor{" "}
          <Anchor href="https://discord.com/invite/bittensor" target="_blank">
            Discord
          </Anchor>
          . Visit the {`'`}pretraining{`'`} channel to ask questions and get real time feedback. You
          can view the ongoing running of the incentive mechanism, the best miners (see {`'`}
          incentive{`'`}), the most inconsensus validators (see {`'`}vtrust{`'`}) using this{" "}
          <Anchor href="https://taostats.io/subnets/netuid-9/" target="_blank">
            taostats link
          </Anchor>
          . The table shows all 256 participant UIDs with corresponding YC stats and earnings. You
          can also view all current wandb runs for miners and validators{" "}
          <Anchor href="https://wandb.ai/opentensor-dev/pretraining-subnet" target="_blank">
            here
          </Anchor>
          .
        </Text>
        <Title order={1}>Installing</Title>
        <Text>
          Before beginning you will need to install <Pill>pretrain</Pill> (this repo) and{" "}
          <Pill>bittensor</Pill>, both require atleast python3.8. We recommend using a package
          manager like anaconda.
        </Text>
        <Code block>
          {`
              git clone https://github.com/unconst/pretrain-subnet.git
              cd pretrain-subnet
              python -m pip install -e . 
            `}
        </Code>
        <Text>Once installed correctly you can import these packages in python.</Text>
        <Code block>
          {`
              import bittensor as bt
              import pretrain as pt
            `}
        </Code>
        <Text>
          And use the Bittensor CLI (for things Bittensor related, liking seeing TAO balance,
          transfering funds, making wallet, and viewing the network.)
        </Text>
        <Code block>
          {`
              btcli --help
            `}
        </Code>
        <Title order={1}>Mining Steps</Title>
        <List spacing="xs" size="sm" listStyleType="decimal">
          <List.Item>
            <Title order={4}>Get a Wandb Account:</Title>
            <Text>
              Miner and validators make heavy use of weights and biases in order to share model
              state and validation information. Both miners and validators must attain a wandb
              account from{" "}
              <Anchor href="https://wandb.ai/home" target="_blank">
                wandb
              </Anchor>{" "}
              along with their wandb api key which can be found by following the instructions{" "}
              <Anchor href="https://docs.wandb.ai/quickstart" target="_blank">
                here
              </Anchor>
              .
            </Text>
          </List.Item>
          <List.Item>
            <Title order={4}>(Optional) Run a Subtensor instance:</Title>
            <Text>
              Your node will run better if you are connecting to a local Bittensor chain entrypoint
              node rather than using Opentensor{`'`}s. We recommend running a local node as follows
              and passing the <Pill>--subtensor.network local</Pill> flag to your running
              miners/validators. To install and run a local subtensor node follow the commands below
              with Docker and Docker-Compose previously installed.
            </Text>
            <Code block>
              {`
              git clone https://github.com/opentensor/subtensor.git
              cd subtensor
              docker compose up --detach
                `}
            </Code>
          </List.Item>
          <List.Item>
            <Title order={4}>Create your Bittensor wallet.</Title>
            <Text>
              Each miners and validator requires a Bittensor coldkey and hotkey pair. To create a
              wallet for either your validator or miner run the following command in your terminal.
              Make sure to save the mnemonic for both keys and store them in a safe place.
            </Text>
            <Code block>
              {`
                # to create your miner/validator cold + hotkey keys.
                btcli w create --wallet.name ... --wallet.hotkey ... 
                btcli w list # to view your created keys.              
                `}
            </Code>
            <Text>Or in python</Text>
            <Code block>
              {`
                import bittensor as bt
                wallet = bt.wallet().create_if_non_existent()
                `}
            </Code>
          </List.Item>
          <List.Item>
            <Title order={4}>Register your wallet to Subnet 9</Title>
            <Text>
              Miner and validator wallets must be registered to the subnet 9 mechanism before they
              are considered active in the network and be considered avaialble for mining TAO. There
              are two options. #1 Registering your walelt by recycling TAO to pay for entrance. To
              register your key run the following command. If you don{`'`}t have any TAO message
              const [t,t] on Discord for a faucet to try things out, please don{`'`}t scam me.
            </Text>
            <Code block>
              {`
               # register your cold and associated hotkey to netuid 9 using recycle.
               btcli s register --wallet.name ... --wallet.hotkey ... --netuid 9       
                `}
            </Code>
            <Text>
              The second option is to run a prolonged proof of work or POW to pay for entrance into
              the network. You can registed your wallet using a POW using the following command:
            </Text>
            <Code block>
              {`
              # register your cold and associated hotkey to netuid 9 using POW
              btcli s pow_register --wallet.name ... --wallet.hotkey ... --netuid 9 
                `}
            </Code>
          </List.Item>
        </List>
      </Stack>
    </Container>
  );
}
