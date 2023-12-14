import { Group, Stack, Text } from "@mantine/core";

export interface TopBarProps {
  metrics: Record<string, number>;
}

export function TopBar({ metrics }: TopBarProps): JSX.Element {
  return (
    <Group wrap="nowrap" justify="space-between">
      {Object.entries(metrics).map(([key, value]) => (
        <Stack key={key} align="center">
          <Text fw="bold">{key}</Text>
          <Text>{value}</Text>
        </Stack>
      ))}
    </Group>
  );
}
