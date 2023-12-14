import { Group, Image, Stack, Text } from "@mantine/core";
import Logo from "../Header/logo.png";
import { PropertiesDictionary } from "./utils";

export interface Data {
  properties: Record<keyof PropertiesDictionary, number>;
}

export function TopBar({ properties }: Data): JSX.Element {
  return (
    <Group justify="space-between" wrap="nowrap">
      <Image {...Logo} h={30} alt="Openpretrain logo" />
      <Group wrap="nowrap">
        {Object.entries(properties).map(([key, value]) => (
          <Stack key={key} align="center">
            <Text fw="bold">{PropertiesDictionary[key as keyof PropertiesDictionary]}</Text>
            <Text>{value}</Text>
          </Stack>
        ))}
      </Group>
    </Group>
  );
}
