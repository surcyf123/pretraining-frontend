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

export function Dashboard() {
  const { colorScheme } = useMantineColorScheme();
  const processedData = useMemo<UIDDetails[]>(
    () =>
      Data.flatMap((ele) => Object.values(ele.uid_data))
        .filter((ele): ele is UIDDetails => ele?.average_loss !== undefined && ele?.average_loss !== null && ele?.win_rate > 0)
        .map((ele) => ({
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

  const processedMultiJSON = useMemo<Record<string, RunDetails[]>>(
    () =>
      Object.entries(MultiJSON).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value
            .filter(({ best_average_loss }) => best_average_loss !== null)
            .map((ele) => ({ ...ele, timestamp: ele.timestamp * 1000 })),
        }),
        {},
      ),
    [],
  );

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
      <Card shadow="md">
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
