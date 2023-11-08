import { Card, Stack, useMantineColorScheme, Group } from "@mantine/core";
import { ascending, rollup, sort } from "d3-array";
import { useMemo } from "react";
import { CategoricalBarChart } from "../../charts/CategoricalBarChart";
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
  return (
    <Stack>
      <Card shadow="md">
        <LineChart
          data={chartData}
          yAxis="loss"
          xAxis="timestamp"
          yAxisTitle="Loss"
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
            xAxis="id"
            yAxis="loss"
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
