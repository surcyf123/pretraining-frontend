import { Card, Group, Stack, useMantineColorScheme } from "@mantine/core";
import { LineChart } from "../../charts/LineChart";
import { StatisticsTable } from "../../components/StatisticsTable";
import { DummyData } from "../../sample-data/state";

export function Dashboard() {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Stack>
      <Group grow>
        <Card shadow="md">
          <LineChart
            chartType="time"
            data={Object.values(DummyData)}
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
            data={Object.values(DummyData)}
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
            data={Object.values(DummyData)}
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
        <StatisticsTable
          data={Object.entries(DummyData).map(([key, value]) => ({ id: key, ...value }))}
        />
      </Card>
    </Stack>
  );
}
