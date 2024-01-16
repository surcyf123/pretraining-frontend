import { Card, Stack, useMantineColorScheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchHeatmapData, fetchNeurons } from "../../api";
import { Heatmap } from "../../charts/Heatmap";
import { MetagraphTable } from "../../components/MetagraphTable";

export function Subnet(): JSX.Element {
  const { netuid } = useParams<{ netuid: string }>();
  const { colorScheme } = useMantineColorScheme();
  const { data: heatmapData, isLoading: isHeatmapDataLoading } = useQuery({
    queryKey: ["heatmap", netuid],
    queryFn: () => fetchHeatmapData(Number.parseInt(netuid ?? "0", 10), 20000),
    refetchInterval: 10 * 60 * 1000,
  });
  const { data: neurons, isLoading: isLoadingNeurons } = useQuery({
    queryKey: ["neurons", netuid],
    queryFn: () => fetchNeurons(Number.parseInt(netuid ?? "0", 10)),
    refetchInterval: 10 * 60 * 1000,
  });

  return (
    <Stack>
      <Card shadow="md">
        <Heatmap
          title={`Subnet: ${netuid}`}
          style={{ height: "70vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
          data={heatmapData ?? []}
          xAxis="minerID"
          yAxis="validatorID"
          visualAxis="weight"
          visualAxisLabel="Weight"
          xAxisLabel="Neuron"
          yAxisLabel="Validator"
          loading={isHeatmapDataLoading}
        />
      </Card>
      <Card shadow="md">
        <MetagraphTable data={neurons ?? []} loading={isLoadingNeurons} />
      </Card>
    </Stack>
  );
}
