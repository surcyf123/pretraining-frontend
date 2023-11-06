import { Card, Group, Stack, useMantineColorScheme } from "@mantine/core";
import { ascending, rollup, sort } from "d3-array";
import { useMemo } from "react";
import { LineChart } from "../../charts/LineChart";
import { StatisticsTable } from "../../components/StatisticsTable";
import { Data } from "../../sample-data/state";
import type { CompleteStatistics } from "../../sample-data/state";

export function Dashboard() {
  const { colorScheme } = useMantineColorScheme();
  const processedData = useMemo(() => Data.flatMap(({ data, timestamp }) =>
    Object.entries(data).map<CompleteStatistics>(([key, value]) => ({
      id: key,
      timestamp,
      ...value,
    })),
  ), []);
  const tableData = useMemo(() => [...rollup(
      processedData,
      (arr) => sort(arr, (a, b) => ascending(a.timestamp, b.timestamp)).pop(),
      (d) => d.id,
    ).values()].filter((ele): ele is CompleteStatistics => ele !== undefined), [processedData]);
  return (
    <Stack>
      <Group grow>
        <Card shadow="md">
          <LineChart
            chartType="time"
            data={processedData}
            yAxis="loss"
            xAxis="timestamp"
            yAxisTitle="Loss"
            xAxisTitle="Time"
            style={{ height: "30vh" }}
            theme={colorScheme === "auto" ? "dark" : colorScheme}
          />
        </Card>
        <Card shadow="md">
          <LineChart
            chartType="time"
            data={processedData}
            yAxis="loss"
            xAxis="timestamp"
            yAxisTitle="Loss"
            xAxisTitle="Time"
            style={{ height: "30vh" }}
            theme={colorScheme === "auto" ? "dark" : colorScheme}
          />
        </Card>
        <Card shadow="md">
          <LineChart
            chartType="time"
            data={processedData}
            yAxis="loss"
            xAxis="timestamp"
            yAxisTitle="Loss"
            xAxisTitle="Time"
            style={{ height: "30vh" }}
            theme={colorScheme === "auto" ? "dark" : colorScheme}
          />
        </Card>
      </Group>
      <Card shadow="md">
        <StatisticsTable data={tableData} />
      </Card>
    </Stack>
  );
}
