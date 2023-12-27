import { Card, Divider, Stack, Text } from "@mantine/core";
import { Heatmap } from "../../charts/Heatmap";
import { HeatmapData } from "../../charts/Heatmap/data";
import { TaoStats } from "../../components/TaoStats";
import { ValidatorTable } from "../../components/ValidatorTable";
import { Validators } from "../../components/ValidatorTable/utils";

export function General(): JSX.Element {
  return (
    <Stack>
      <TaoStats />
      <Divider />
      <ValidatorTable data={Validators} />
      <Card shadow="md">
        <Heatmap
          title="Weight Matrix"
          style={{ height: "50vh" }}
          data={HeatmapData}
          xAxis="minerID"
          yAxis="validatorID"
          visualAxis="weight"
          xAxisLabel="Miner"
          yAxisLabel="Validator"
        />
      </Card>
      <Text ta="center">Comming soon...</Text>
    </Stack>
  );
}
