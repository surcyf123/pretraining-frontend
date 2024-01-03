import { Card, Divider, Stack, Text, Title, useMantineColorScheme } from "@mantine/core";
import { Heatmap } from "../../charts/Heatmap";
import { HeatmapData } from "../../charts/Heatmap/data";
import { TaoStats } from "../../components/TaoStats";
import { ValidatorTable } from "../../components/ValidatorTable";
import { VitalsTable } from "../../components/VitalsTable";

export function General(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Stack>
      <TaoStats />
      <Divider />
      <Title order={4}>Subnet Details</Title>
      <ValidatorTable />
      <Title order={4}>Subnet Emissions</Title>
      <VitalsTable />
      <Title order={4}>Subnet Weights</Title>
      <Card shadow="md">
        <Heatmap
          title="Weight Matrix"
          style={{ height: "50vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
          data={HeatmapData}
          xAxis="minerID"
          yAxis="validatorID"
          visualAxis="weight"
          visualAxisLabel="Weight"
          xAxisLabel="NetUID"
          yAxisLabel="Validator"
        />
      </Card>
      <Text ta="center">More coming soon...</Text>
    </Stack>
  );
}
