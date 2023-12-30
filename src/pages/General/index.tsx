import { Card, Divider, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { Heatmap } from "../../charts/Heatmap";
import { HeatmapData } from "../../charts/Heatmap/data";
import { TaoStats } from "../../components/TaoStats";
import { ValidatorTable } from "../../components/ValidatorTable";
import { Validators } from "../../components/ValidatorTable/utils";
import { VitalTable } from "../../components/VitalTable";
import { Vitals } from "../../components/VitalTable/utils";

export function General(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Stack>
      <TaoStats />
      <Divider />
      <ValidatorTable data={Validators} />
      <VitalTable data={Vitals} />
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
      <Text ta="center">More comming soon...</Text>
    </Stack>
  );
}
