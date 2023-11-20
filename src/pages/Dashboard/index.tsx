import { Card, Stack, useMantineColorScheme, Group } from "@mantine/core";
import { ascending, rollup, sort } from "d3-array";
import { useMemo } from "react";
import { BestLossChart } from "../../charts/BestLossChart";
import { CategoricalBarChart } from "../../charts/CategoricalBarChart";
import { LineChart } from "../../charts/LineChart";
import { PieChart } from "../../charts/PieChart";
import { StatisticsTable } from "../../components/StatisticsTable";
import { Data, MultiJSON } from "../../sample-data/state";
import type { RunDetails, UIDDetails } from "../../sample-data/interfaces";
import type { InternMap } from "d3-array";

export function Dashboard() {
  const { colorScheme } = useMantineColorScheme();
  const processedData = useMemo<UIDDetails[]>(
    () =>
      Data.flatMap((ele) => Object.values(ele.uid_data)).map((ele) => ({
        ...ele,
        timestamp: ele.timestamp * 1000, // timestamp provided is in seconds and javascript Date api expects milliseconds.
      })),
    [],
  );
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

  const processedMultiJSON = useMemo<InternMap<string, RunDetails[]>>(() => {
    const runDetails = Object.entries(MultiJSON)
      .flatMap(([key, values]) =>
        values
          .filter((ele): ele is RunDetails => ele !== null)
          .map((ele) => ({ ...ele, series: key })),
      )
      .map((ele) => ({
        ...ele,
        timestamp: ele.timestamp * 1000, // timestamp provided is in seconds and javascript Date api expects milliseconds.
      }));
    const output = rollup(
      runDetails,
      (ele) => ele,
      ({ series }) => series,
    );
    return output;
  }, []);

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

  return (
    <Stack>
      <Card shadow="md">
        <LineChart
          data={chartData}
          yAxis="average_loss"
          xAxis="timestamp"
          yAxisTitle="Loss"
          xAxisTitle="Time"
          style={{ height: "30vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
        />
      </Card>
      <Card>
        <BestLossChart
          data={processedMultiJSON}
          yAxis="best_average_loss"
          xAxis="timestamp"
          yAxisTitle="Best average loss"
          xAxisTitle="Time"
          style={{ height: "30vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
        />
      </Card>
      <Group grow>
        <Card shadow="md">
          <PieChart
            data={tableData}
            style={{ height: "30vh" }}
            theme={colorScheme === "auto" ? "dark" : colorScheme}
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
          />
        </Card>
      </Group>
      <Card shadow="md">
        <StatisticsTable data={tableData} />
      </Card>
    </Stack>
  );
}
