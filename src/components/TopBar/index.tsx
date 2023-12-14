import { Group, Image, Stack, Text } from "@mantine/core";
import Logo from "../Header/logo.png";

export interface TopBarProps {
  metrics: Record<string, number>;
}

export function TopBar({ metrics }: TopBarProps): JSX.Element {
  return (
    <Group justify="space-between" wrap="nowrap">
      <Image {...Logo} h={30} alt="Openpretrain logo" />
      <Group wrap="nowrap">
        {Object.entries(metrics).map(([key, value]) => (
          <Stack key={key} align="center">
            <Text fw="bold">{key}</Text>
            <Text>{value}</Text>
          </Stack>
        ))}
      </Group>
    </Group>
  );
}
