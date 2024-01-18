import { Card, Grid, Skeleton, Stack, Text } from "@mantine/core";

export interface TopBarProps {
  metrics: Record<string, string | number | undefined | null>;
  loading?: boolean;
}

export function TopBar({ metrics, loading }: TopBarProps): JSX.Element {
  return (
    <Skeleton visible={loading ?? false}>
      <Grid>
        {Object.entries(metrics).map(([key, value]) => (
          <Grid.Col span={{ base: 12, md: 4 }} key={key}>
            <Card>
              <Stack align="center">
                <Text fw="bold">{key}</Text>
                <Text>{value}</Text>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Skeleton>
  );
}
