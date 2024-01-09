import { Card, Stack, useMantineColorScheme, Group, Loader, Divider } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { ascending, rollup, sort } from "d3-array";
import { useMemo } from "react";
import {
  fetchTableData,
  fetchLineChartData,
  fetchNeurons,
  fetchMetagraphMetadata,
} from "../../api";
import { BestLossChart } from "../../charts/BestLossChart";
import { CategoricalBarChart } from "../../charts/CategoricalBarChart";
import { MetaBox } from "../../components/MetaBox";
import { MetagraphTable } from "../../components/MetagraphTable";
import { StatisticsTable } from "../../components/StatisticsTable";
import { TopBar } from "../../components/TopBar";
import { calculateAverageValidatorTrust } from "./utils";
import type { UIDDetails } from "../../utils";
import type { InternMap } from "d3-array";

export function Dashboard() {
  const {
    data: recentUIDJSON,
    isLoading: isRecentUIDJSONLoading,
    isRefetching: isRefetchingRecentUIDJSON,
  } = useQuery({
    queryKey: ["recentUIDJSON"],
    queryFn: () => fetchTableData(),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });

  const {
    data: historyJSON,
    isLoading: isHistoryJSONLoading,
    isRefetching: isRefetchingHistoryJSON,
  } = useQuery({
    queryKey: ["historyJSON"],
    queryFn: () => fetchLineChartData(30),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });

  const {
    data: recentJSON,
    isLoading: isRecentJSONLoading,
    isRefetching: isRefetchingRecentJSON,
  } = useQuery({
    queryKey: ["recentJSON"],
    queryFn: () => fetchLineChartData(3),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });

  const {
    data: metagraphMetadata,
    isRefetching: isRefetchingMetagraphMetadata,
    isLoading: isLoadingMetagraphMetadata,
  } = useQuery({
    queryKey: ["metagraphMetadata"],
    queryFn: () => fetchMetagraphMetadata(9),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });

  const {
    data: neurons,
    isRefetching: isRefetchingNeurons,
    isLoading: isLoadingNeurons,
  } = useQuery({
    queryKey: ["neurons"],
    queryFn: () => fetchNeurons(9),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });

  const averageValidatorTrust = useMemo(
    () => calculateAverageValidatorTrust(neurons ?? []),
    [neurons],
  );

  const isRefetching =
    isRefetchingRecentUIDJSON === true ||
    isRefetchingHistoryJSON === true ||
    isRefetchingRecentJSON === true ||
    isRefetchingNeurons === true ||
    isRefetchingMetagraphMetadata === true;

  const { colorScheme } = useMantineColorScheme();
  // complete chart data
  const chartData = useMemo(() => {
    let output: InternMap<string, UIDDetails[]> | undefined;
    if (isRecentUIDJSONLoading === false && recentUIDJSON !== undefined) {
      output = rollup(
        recentUIDJSON,
        (arr) => sort(arr, (a, b) => ascending(a.block, b.block)),
        (d) => d.uid.toString(),
      );
    }
    return output;
  }, [isRecentUIDJSONLoading, recentUIDJSON]);

  // latest data for each UID
  const tableData = useMemo(() => {
    const output: UIDDetails[] = [];
    chartData?.forEach((ele) => {
      const last = ele.pop();
      if (last !== undefined) {
        output.push(last);
      }
    });
    return output;
  }, [chartData]);

  const bestLossData = useMemo(() => {
    const losses = tableData
      .map((ele) => ele.average_loss)
      .filter((ele): ele is number => typeof ele === "number");

    const minimumLoss = Math.min(...losses);
    return tableData.find((ele) => ele.average_loss === minimumLoss);
  }, [tableData]);

  return (
    <Stack>
      <MetaBox data={metagraphMetadata} loading={isLoadingMetagraphMetadata} />
      <Divider />
      <TopBar
        metrics={{
          "Best UID": bestLossData?.uid,
          "Average Loss": bestLossData?.average_loss?.toFixed(4),
          "Average Validator Trust": averageValidatorTrust?.toFixed(4),
          "Win Percentage": bestLossData?.win_rate.toLocaleString(undefined, {
            style: "percent",
            maximumFractionDigits: 2,
          }),
          Weight: bestLossData?.weight?.toFixed(4),
          "Win Total": bestLossData?.win_total,
        }}
        loading={isRecentUIDJSONLoading}
      />
      <Divider />
      <Card shadow="md">
        <BestLossChart
          title="All Time"
          data={historyJSON ?? []}
          yAxis="smoothed_best_average_loss"
          xAxis="timestamp"
          yAxisTitle="Best average loss"
          xAxisTitle="Time"
          style={{ height: "40vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
          loading={isHistoryJSONLoading}
        />
      </Card>
      <Card shadow="md">
        <BestLossChart
          title="Recent"
          data={recentJSON ?? []}
          yAxis="smoothed_best_average_loss"
          xAxis="timestamp"
          yAxisTitle="Best average loss"
          xAxisTitle="Time"
          style={{ height: "40vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
          loading={isRecentJSONLoading}
        />
      </Card>

      <Group grow>
        <Card shadow="md">
          <CategoricalBarChart
            data={tableData}
            style={{ height: "30vh" }}
            theme={colorScheme === "auto" ? "dark" : colorScheme}
            xAxis="uid"
            yAxis="weight"
            xAxisTitle="UID"
            yAxisTitle="Weight"
            loading={isRecentUIDJSONLoading}
          />
        </Card>
        <Card shadow="md">
          <CategoricalBarChart
            data={tableData}
            style={{ height: "30vh" }}
            theme={colorScheme === "auto" ? "dark" : colorScheme}
            xAxis="uid"
            yAxis="win_rate"
            xAxisTitle="UID"
            yAxisTitle="Win Rate"
            loading={isRecentUIDJSONLoading}
          />
        </Card>
        <Card shadow="md">
          <CategoricalBarChart
            data={tableData}
            style={{ height: "30vh" }}
            theme={colorScheme === "auto" ? "dark" : colorScheme}
            xAxis="uid"
            yAxis="average_loss"
            xAxisTitle="UID"
            yAxisTitle="Loss"
            loading={isRecentUIDJSONLoading}
          />
        </Card>
      </Group>
      <Card shadow="md">
        <StatisticsTable data={tableData} loading={isRecentUIDJSONLoading} />
      </Card>
      <Card shadow="md">
        <MetagraphTable data={neurons ?? []} loading={isLoadingNeurons} />
      </Card>
      {isRefetching === true ? (
        <Loader color="blue" type="bars" pos="fixed" left="20px" bottom="20px" />
      ) : null}
    </Stack>
  );
}
