import { Card, Grid, Group, Skeleton, Stack, Text } from "@mantine/core";
import { IconId, IconNetwork, IconPackage, IconTallymarks } from "@tabler/icons-react";
import type { MetagraphMetadata } from "../../api";

export function MetaBox({
  data,
  loading,
}: {
  data?: MetagraphMetadata;
  loading?: boolean;
}): JSX.Element {
  return (
    <Skeleton visible={loading ?? false}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card>
            <Stack>
              <Group>
                <IconId />
                <Text>Network UID</Text>
              </Group>
              <Text>{data?.netuid}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card>
            <Stack>
              <Group>
                <IconTallymarks />
                <Text>Neurons Count</Text>
              </Group>
              <Text>{data?.n}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card>
            <Stack>
              <Group>
                <IconPackage />
                <Text>Block</Text>
              </Group>
              <Text>{data?.block}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card>
            <Stack>
              <Group>
                <IconNetwork />
                <Text>Network & Version</Text>
              </Group>
              <Text>
                {data?.network} | {data?.version}
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Skeleton>
  );
}
