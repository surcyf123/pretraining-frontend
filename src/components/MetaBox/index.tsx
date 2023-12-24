import { Card, Grid, Skeleton, Stack, Text } from "@mantine/core";
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
              <Text>Network UID</Text>
              <Text>{data?.netuid}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card>
            <Stack>
              <Text>Neurons Count</Text>
              <Text>{data?.n}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card>
            <Stack>
              <Text>Block</Text>
              <Text>{data?.block}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card>
            <Stack>
              <Text>Network & Version</Text>
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
