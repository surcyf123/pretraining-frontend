import { Box, Card, Divider, Stack, Title, useMantineColorScheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { fetchHeatmapData, fetchTaoCandlestick } from "../../api";
import { CandlestickChart } from "../../charts/CandlestickChart";
import { Heatmap } from "../../charts/Heatmap";
import { MemoizedTradingViewWidget } from "../../charts/TradingViewWidget";
import { TaoStats } from "../../components/TaoStats";
import { ValidatorTable } from "../../components/ValidatorTable";
import { VitalsTable } from "../../components/VitalsTable";

export function General(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const { data: heatmapData, isLoading: isHeatmapDataLoading } = useQuery({
    queryKey: ["heatmap"],
    queryFn: () => fetchHeatmapData(0, 20000),
    refetchInterval: 10 * 60 * 1000,
  });
  const { data: taoCandlestick, isLoading: isTaoCandlestick } = useQuery({
    queryKey: ["taoCandlestick"],
    queryFn: () => fetchTaoCandlestick(),
    refetchInterval: 10 * 60 * 1000,
  });
  return (
    <Stack>
      <TaoStats />
      <Divider />
      <Card shadow="md">
        <Box h="50vh">
          <MemoizedTradingViewWidget />
        </Box>
      </Card>
      <Card shadow="md">
        <CandlestickChart
          title="Tao Prices"
          style={{ height: "50vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
          data={taoCandlestick ?? []}
          xAxis="Time"
          yAxis="USD/τ"
          loading={isTaoCandlestick}
        />
      </Card>
      <Title order={4}>Subnet Emissions</Title>
      <VitalsTable />
      <Title order={4}>Validator Details</Title>
      <ValidatorTable />
      <Title order={4}>Subnet Weights</Title>
      <Card shadow="md">
        <Heatmap
          title="Weight Matrix"
          style={{ height: "50vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
          data={heatmapData?.filter((ele) => ele.minerID > 0) ?? []} // TODO: update this logic on backend.
          xAxis="minerID"
          yAxis="validatorID"
          visualAxis="weight"
          visualAxisLabel="Weight"
          xAxisLabel="NetUID"
          yAxisLabel="Validator"
          loading={isHeatmapDataLoading}
        />
      </Card>
    </Stack>
  );
}
