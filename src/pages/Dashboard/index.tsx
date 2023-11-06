import { Card, Stack, useMantineColorScheme } from "@mantine/core";
import { ascending, rollup, sort } from "d3-array";
import { useMemo } from "react";
import { LineChart } from "../../charts/LineChart";
import { StatisticsTable } from "../../components/StatisticsTable";
import { Data } from "../../sample-data/state";
import type { CompleteStatistics } from "../../sample-data/state";

export function Dashboard() {
  const { colorScheme } = useMantineColorScheme();
  const processedData = useMemo(
    () =>
      Data.flatMap(({ data, timestamp }) =>
        Object.entries(data).map<CompleteStatistics>(([key, value]) => ({
          id: key,
          timestamp,
          ...value,
        })),
      ),
    [],
  );
  const tableData = useMemo(
    () =>
      [
        ...rollup(
          processedData,
          (arr) => sort(arr, (a, b) => ascending(a.timestamp, b.timestamp)).pop(),
          (d) => d.id,
        ).values(),
      ].filter((ele): ele is CompleteStatistics => ele !== undefined),
    [processedData],
  );
  const chartData = useMemo(
    () =>
      rollup(
        processedData,
        (arr) => sort(arr, (a, b) => ascending(a.timestamp, b.timestamp)),
        (d) => d.id,
      ),
    [processedData],
  );
  return (
    <Stack>
      <Card shadow="md">
        <LineChart
          chartType="time"
          data={chartData}
          yAxis="loss"
          xAxis="timestamp"
          yAxisTitle="Loss"
          xAxisTitle="Time"
          style={{ height: "40vh" }}
          theme={colorScheme === "auto" ? "dark" : colorScheme}
        />
      </Card>
      <Card shadow="md">
        <StatisticsTable data={tableData} />
      </Card>
    </Stack>
  );
}
