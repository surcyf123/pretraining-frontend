import MultiJSONData from "../../sample-data/multi.json";
import { BestLossChart } from ".";
import type { RunDetails } from "../../utils";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "BestLossChart",
  component: BestLossChart,
  args: {
    data: MultiJSONData as Record<string, RunDetails[]>,
    yAxis: "best_average_loss",
    xAxis: "timestamp",
    yAxisTitle: "Best average loss",
    xAxisTitle: "Time",
    style: { height: "100vh" },
  },
} as Meta<typeof BestLossChart>;

export const Template: StoryObj<typeof BestLossChart> = {};
