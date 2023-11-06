import { Card, Group, Stack, useMantineColorScheme } from "@mantine/core";
import { LineChart } from "../../charts/LineChart";
import { StatisticsTable } from "../../components/StatisticsTable";
import { Data } from "../../sample-data/state";
import type { CompleteStatistics } from "../../sample-data/state";

export function Dashboard() {
  const { colorScheme } = useMantineColorScheme();
  const processedData = Data.flatMap(({ data, timestamp }) =>
    Object.entries(data).map<CompleteStatistics>(([key, value]) => ({
      id: key,
      timestamp,
      ...value,
    })),
  );
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
        <StatisticsTable data={processedData} />
      </Card>
    </Stack>
  );
}
