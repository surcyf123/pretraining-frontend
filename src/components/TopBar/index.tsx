import { Group, Image, Stack, Text } from "@mantine/core";
import Logo from "../Header/logo.png";

const Properties = {
  minLoss: "Min loss",
  averageLoss: "Average loss",
  bestUID: "Best UID",
  averageVTrust: "Average Vtrust",
  subnetEmission: "Subnet Emission",
} as const;

export interface Data {
  properties: Record<keyof typeof Properties, number>;
}

export function TopBar({ properties }: Data): JSX.Element {
  return (
    <Group justify="space-between">
      <Image {...Logo} h={30} alt="Openpretrain logo" />
      <Group align="center">
        {Object.entries(properties).map(([key, value]) => (
          <Stack key={key}>
            <Text fw="bold">{Properties[key as keyof typeof Properties]}</Text>
            <Text>{value}</Text>
          </Stack>
        ))}
      </Group>
    </Group>
  );
}
