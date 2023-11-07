import { Card, Stack, useMantineColorScheme, Group } from "@mantine/core";
import { ascending, rollup, sort } from "d3-array";
import { useMemo } from "react";
import { LineChart } from "../../charts/LineChart";
import { PieChart } from "../../charts/PieChart";
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
  const chartData = useMemo(
    () =>
      rollup(
        processedData,
        (arr) => sort(arr, (a, b) => ascending(a.timestamp, b.timestamp)),
        (d) => d.id,
      ),
    [processedData],
  );
  const tableData = useMemo(() => {
    const output: CompleteStatistics[] = [];
    chartData.forEach((ele) => {
      const last = ele.pop();
      if (last !== undefined) {
        output.push(last);
      }
    });
    return output;
  }, [chartData]);
  const pieData = useMemo(() => tableData.map((ele) => ({value: ele["Win Percentage"] ?? 0, name: ele.id})), [tableData]);
  return (
    <Stack>
      <Group grow>
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
          <PieChart
            data={pieData}
            style={{ height: "40vh" }}
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
