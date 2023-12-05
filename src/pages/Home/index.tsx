import { Anchor, Code, Container, List, Pill, Stack, Text, Title } from "@mantine/core";

export function Home(): JSX.Element {
  return (
    <Container>
      <Stack gap="xl">
          <Title order={1}>Bittensor Pretrain Subnet</Title>
          <Text c="gray.6">
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
              Validators run a continuous eval on the hosted models, performing the validation
              system outlined in neurons/validator.py and setting weights to the chain based on the
              performance of each miner on the Falcon dataset.
            </List.Item>
            <List.Item>
              The chain aggregates weights from all active validators and runs Yuma Consensus to
              determine the proportion of TAO emission rewarded to miners and validators.
            </List.Item>
          </List>
        </Stack>
        <Stack>
          <Title order={1}>Pretraining</Title>
          <Text c="gray.6">
            Bittensor hosts multiple incentive mechanism through which miners are evaluated by
            validators for performing actions well. Validators perform the process of evaluation and{" "}
            {`'`}set weights{`'`}, which are transactions into Bittensor{`'`}s{" "}
            <Anchor
              href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fentrypoint-finney.opentensor.ai#/explorer"
              target="_blank"
            >
              blockchain
            </Anchor>
            . Each incentive mechanism in Bittensor is called a {`'`}subnet{`'`} and has an
            identifier (This particular mechanism has subnet uid 9). Weights and the amount of TAO
            held by the validators become inputs to Bittensor{`'`}s consensus mechanism called{" "}
            <Anchor
              href="https://github.com/opentensor/subtensor/blob/feature/consensus-readme/docs/consensus.md"
              target="_blank"
            >
              Yuma Consensus
            </Anchor>
            . YC drives validators towards a consensus, agreement about the value of the work done
            by miners. The miners with the highest agreed upon scores are minted TAO, the network
            digital currency. You can view this information{" "}
            <Anchor href="https://taostats.io/subnets/netuid-9/" target="_blank">
              here
            </Anchor>
            .
          </Text>
          <Text c="gray.6">
            Miners within this subnet are evaluated based on the number of times the model they have
            hosted has a lower loss than another model on the network when randomly sampling from
            the near infinite Falcon Refined Web pretraining dataset. To perform well, miners must
            attain the lowest loss on the largest number of random batches. All models are open and
            accessible via a{" "}
            <Anchor href="https://wandb.ai/opentensor-dev/pretraining-subnet" target="_blank">
              wandb project
            </Anchor>{" "}
            and this repo contains tools for downloading them, serving them to your miner, as well
            as getting data from validators about which models perform best on which pages of the
            Falcon Dataset. Finding the best model and delta at the earliest timestamp ensures the
            most incentive.
          </Text>
          <Text mt="lg">
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
        </Stack>
    </Container>
  );
}
