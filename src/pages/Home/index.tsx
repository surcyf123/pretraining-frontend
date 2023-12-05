import { Container, List, Stack, Text, Title } from "@mantine/core";

export function Home(): JSX.Element {
  return (
    <Container>
      <Stack>
        <Title order={1}>Bittensor Pretrain Subnet</Title>
        <Text c="gray.6">
          Bittensor subnet 9 rewards miners (engineers etc) for producing pretrained
          Foundation-Models on the Falcon Refined Web dataset. It acts like a continuous benchmark
          whereby miners are rewarded for attaining the best losses on randomly sampled pages of
          Falcon given a consistent model architecture. The reward mechanism works as follows:
        </Text>
        <List mt="lg" spacing="xs" size="sm">
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
      </Stack>
    </Container>
  );
}
