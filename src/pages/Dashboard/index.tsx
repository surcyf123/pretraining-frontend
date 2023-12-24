import { Card, Stack, useMantineColorScheme, Group, Loader, Divider } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { ascending, rollup, sort } from "d3-array";
import { useMemo } from "react";
import { fetchTableData, fetchLineChartData, fetchMetagraphData } from "../../api";
import { BestLossChart } from "../../charts/BestLossChart";
import { CategoricalBarChart } from "../../charts/CategoricalBarChart";
import { Heatmap } from "../../charts/Heatmap";
import { MetaBox } from "../../components/MetaBox";
import { MetagraphTable } from "../../components/MetagraphTable";
import { StatisticsTable } from "../../components/StatisticsTable";
import { TaoStats } from "../../components/TaoStats";
import { TopBar } from "../../components/TopBar";
import type { UIDDetails } from "../../utils";

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
    queryFn: () => fetchLineChartData("history.json"),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });

  const {
    data: recentJSON,
    isLoading: isRecentJSONLoading,
    isRefetching: isRefetchingRecentJSON,
  } = useQuery({
    queryKey: ["recentJSON"],
    queryFn: () => fetchLineChartData("recent.json"),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });

  const {
    data: metagraphDetails,
    isRefetching: isRefetchingMetagraphJSON,
    isLoading: isLoadingMetagraphJSON,
  } = useQuery({
    queryKey: ["metagraphJSON"],
    queryFn: () => fetchMetagraphData(),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });

  const heatmapData = useMemo(
    () =>
      (metagraphDetails?.neuronData ?? []).flatMap(({ weight, uid }) =>
        weight.map<Record<string, number | string | undefined | null>>((ele, index) => ({
          validatorID: uid,
          weight: ele,
          minerID: index,
        })),
      ),
    [metagraphDetails?.neuronData],
  );

  const isRefetching =
    isRefetchingRecentUIDJSON === true ||
    isRefetchingHistoryJSON === true ||
    isRefetchingRecentJSON === true ||
    isRefetchingMetagraphJSON === true;

  const { colorScheme } = useMantineColorScheme();
  const processedData = useMemo<UIDDetails[]>(() => {
    let output: UIDDetails[] = [];
    if (isRecentUIDJSONLoading === false && recentUIDJSON !== undefined) {
      output = Object.values(recentUIDJSON)
        .flat()
        .flatMap((ele) => (ele === null ? [] : Object.values(ele.uid_data)))
        .filter(
          (ele): ele is UIDDetails =>
            ele?.average_loss !== undefined && ele?.average_loss !== null && ele?.win_rate > 0,
        )
        .map((ele) => ({
          ...ele,
          timestamp: ele.timestamp * 1000, // timestamp provided is in seconds and javascript Date api expects milliseconds.
        }));
    }
    return output;
  }, [isRecentUIDJSONLoading, recentUIDJSON]);

  // complete chart data
  const chartData = useMemo(
    () =>
      rollup(
        processedData,
        (arr) => sort(arr, (a, b) => ascending(a.timestamp, b.timestamp)),
        (d) => d.uid.toString(),
      ),
    [processedData],
  );

  // latest data for each UID
  const tableData = useMemo(() => {
    const output: UIDDetails[] = [];
    chartData.forEach((ele) => {
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
      <TaoStats />
      <Divider />
      <MetaBox data={metagraphDetails?.metadata} loading={isLoadingMetagraphJSON} />
      <Divider />
      <TopBar
        metrics={{
          "Best UID": bestLossData?.uid,
          "Average Loss": bestLossData?.average_loss?.toFixed(4),
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
        <StatisticsTable data={tableData} />
      </Card>
      <Card shadow="md">
        <MetagraphTable data={metagraphDetails?.neuronData ?? []} />
      </Card>
      <Card shadow="md">
        <Heatmap
          title="Weight Matrix"
          style={{ height: "50vh" }}
          data={heatmapData}
          xAxis="minerID"
          yAxis="validatorID"
          visualAxis="weight"
          loading={isLoadingMetagraphJSON}
          xAxisLabel="Miner"
          yAxisLabel="Validator"
        />
      </Card>
      {isRefetching === true ? (
        <Loader color="blue" type="bars" pos="fixed" left="20px" bottom="20px" />
      ) : null}
    </Stack>
  );
}
