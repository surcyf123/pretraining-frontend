import { Card, Stack, useMantineColorScheme, Group, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { ascending, rollup, sort } from "d3-array";
import { useMemo } from "react";
import { fetchJSON } from "../../api";
import { BestLossChart } from "../../charts/BestLossChart";
import { CategoricalBarChart } from "../../charts/CategoricalBarChart";
import { PieChart } from "../../charts/PieChart";
import { StatisticsTable } from "../../components/StatisticsTable";
import { ParseMultiJSON } from "./utils";
import type { RunDetails, UIDDetails } from "../../sample-data/interfaces";

export function Dashboard() {
  const {
    data: multiJSON,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["multiJSON"],
    queryFn: () => fetchJSON("recent.json"),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });

  const {
    data: historyJSON,
    isLoading: isHistoryJSONLoading,
    isRefetching: isRefetchingHistoryJSON,
  } = useQuery({
    queryKey: ["historyJSON"],
    queryFn: () => fetchJSON("history.json"),
    refetchInterval: 10 * 60 * 1000,
    // default stale time is 0 Ref: https://tanstack.com/query/v4/docs/react/guides/initial-query-data#staletime-and-initialdataupdatedat
  });

  const { colorScheme } = useMantineColorScheme();
  const processedData = useMemo<UIDDetails[]>(() => {
    let output: UIDDetails[] = [];
    if (isLoading === false && multiJSON !== undefined) {
      output = Object.values(multiJSON)
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
  }, [isLoading, multiJSON]);

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

  const processedMultiJSON = useMemo<Record<string, RunDetails[]>>(() => {
    let output = {};
    if (isLoading === false && multiJSON !== undefined) {
      output = ParseMultiJSON(multiJSON);
    }
    return output;
  }, [isLoading, multiJSON]);

  const historyProcessedData = useMemo<Record<string, RunDetails[]>>(() => {
    let output = {};
    if (isHistoryJSONLoading === false && historyJSON !== undefined) {
      output = ParseMultiJSON(historyJSON);
    }
    return output;
  }, [isHistoryJSONLoading, historyJSON]);

  return (
    <Stack>
      <Card shadow="md">
        <BestLossChart
          data={historyProcessedData}
          yAxis="best_average_loss"
          xAxis="timestamp"
          yAxisTitle="Best average loss"
          xAxisTitle="Time"
          style={{ height: "40vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
          isLoading={isHistoryJSONLoading}
        />
      </Card>
      <Card shadow="md">
        <BestLossChart
          data={processedMultiJSON}
          yAxis="best_average_loss"
          xAxis="timestamp"
          yAxisTitle="Best average loss"
          xAxisTitle="Time"
          style={{ height: "40vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
          isLoading={isLoading}
        />
      </Card>
      <Group grow>
        <Card shadow="md">
          <PieChart
            data={tableData}
            style={{ height: "30vh" }}
            theme={colorScheme === "auto" ? "dark" : colorScheme}
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
          />
        </Card>
      </Group>
      <Card shadow="md">
        <StatisticsTable data={tableData} />
      </Card>
      {isRefetching === true || isRefetchingHistoryJSON === true ? (
        <Loader color="blue" type="bars" pos="fixed" left="20px" bottom="20px" />
      ) : null}
    </Stack>
  );
}
