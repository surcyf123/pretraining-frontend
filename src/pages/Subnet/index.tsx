import { Card, useMantineColorScheme } from "@mantine/core";
import { useParams } from "react-router-dom";
import { Heatmap } from "../../charts/Heatmap";

export function Subnet(): JSX.Element {
  const { netuid } = useParams<{ netuid: string }>();
  const { colorScheme } = useMantineColorScheme();
  return (
    <Card>
      <Heatmap
        title={netuid}
        style={{ height: "50vh" }}
        theme={colorScheme === "auto" ? "dark" : colorScheme}
        // TODO: Add data
        data={[]}
        xAxis="minerID"
        yAxis="validatorID"
        visualAxis="weight"
        visualAxisLabel="Weight"
        xAxisLabel="NetUID"
        yAxisLabel="Validator"
        // TODO: Add loading
      />
    </Card>
  );
}
