import { Heatmap } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Heatmap",
  args: {
    loading: false,
    theme: "dark",
    title: "Heatmap",
    style: { height: "100vh" },
    data: [
      { x: 2, y: 3, value: 0.8 },
      { x: 5, y: 7, value: 0.5 },
      { x: 8, y: 4, value: 0.2 },
      { x: 3, y: 6, value: 0.9 },
      { x: 1, y: 2, value: 0.6 },
      { x: 9, y: 1, value: 0.7 },
      { x: 6, y: 8, value: 0.3 },
      { x: 4, y: 5, value: 0.4 },
      { x: 7, y: 9, value: 0.1 },
      { x: 2, y: 7, value: 0.6 },
      { x: 5, y: 4, value: 0.8 },
      { x: 8, y: 1, value: 0.5 },
      { x: 3, y: 9, value: 0.4 },
      { x: 9, y: 6, value: 0 },
    ],
    seriesName: "value",
    xAxis: "x",
    xAxisLabel: "X",
    yAxis: "y",
    yAxisLabel: "Y",
  },
  component: Heatmap,
} as Meta<typeof Heatmap>;

export const Template: StoryObj<typeof Heatmap> = {};
