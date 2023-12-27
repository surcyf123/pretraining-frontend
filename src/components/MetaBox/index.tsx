import { Card, Grid, Group, Skeleton, Stack, Text } from "@mantine/core";
import { IconId, IconPackage, IconTallymarks } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMetagraphMetaData } from "../../api";

export function MetaBox({ netuid }: { netuid: number }): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ["metagraphJSON", netuid],
    queryFn: () => fetchMetagraphMetaData(netuid),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });
  return (
    <Skeleton visible={isLoading}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card>
            <Stack align="center">
              <Group>
                <IconId />
                <Text>Network UID</Text>
              </Group>
              <Text>{data?.netuid}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card>
            <Stack align="center">
              <Group>
                <IconTallymarks />
                <Text>Neurons Count</Text>
              </Group>
              <Text>{data?.n}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card>
            <Stack align="center">
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
