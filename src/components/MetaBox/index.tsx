import { Card, Grid, Group, Skeleton, Stack, Text } from "@mantine/core";
import { IconId, IconPackage, IconTallymarks } from "@tabler/icons-react";
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
      <Grid grow>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card>
            <Stack align="center" justify="center">
              <Group>
                <IconId />
                <Text>Network UID</Text>
              </Group>
              <Text>{data?.netuid}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card>
            <Stack align="center" justify="center">
              {" "}
              <Group>
                <IconTallymarks />
                <Text>Neurons Count</Text>
              </Group>
              <Text>{data?.n}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card>
            <Stack align="center" justify="center">
              {" "}
              <Group>
                <IconPackage />
                <Text>Block</Text>
              </Group>
              <Text>{data?.block}</Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Skeleton>
  );
}
