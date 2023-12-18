import { Group, Skeleton, Stack, Text } from "@mantine/core";

export interface TopBarProps {
  metrics: Record<string, string | number | undefined | null>;
  loading?: boolean;
}

export function TopBar({ metrics, loading }: TopBarProps): JSX.Element {
  return (
    <Skeleton visible={loading ?? false}>
      <Group wrap="nowrap" justify="space-between">
        {Object.entries(metrics).map(([key, value]) => (
          <Stack key={key} align="center">
            <Text fw="bold">{key}</Text>
            <Text>{value}</Text>
          </Stack>
        ))}
      </Group>
    </Skeleton>
  );
}
