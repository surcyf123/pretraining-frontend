import { Card, useMantineColorScheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchHeatmapData } from "../../api";
import { Heatmap } from "../../charts/Heatmap";

export function Subnet(): JSX.Element {
  const { netuid } = useParams<{ netuid: string }>();
  const { colorScheme } = useMantineColorScheme();
  const { data: heatmapData, isLoading: isHeatmapDataLoading } = useQuery({
    queryKey: [netuid],
    queryFn: () => fetchHeatmapData(Number.parseInt(netuid ?? "0", 10)),
    refetchInterval: 10 * 60 * 1000,
  });
  return (
    <Card>
      <Heatmap
        title={netuid}
        style={{ height: "50vh" }}
        theme={colorScheme === "auto" ? "dark" : colorScheme}
        data={heatmapData ?? []}
        xAxis="minerID"
        yAxis="validatorID"
        visualAxis="weight"
        visualAxisLabel="Weight"
        xAxisLabel="NetUID"
        yAxisLabel="Validator"
        loading={isHeatmapDataLoading}
      />
    </Card>
  );
}