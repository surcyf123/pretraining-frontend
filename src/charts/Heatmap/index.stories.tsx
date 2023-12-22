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
      { x: 2, y: 3, customValue: 0.8 },
      { x: 5, y: 7, customValue: 0.5 },
      { x: 8, y: 4, customValue: 0.2 },
      { x: 3, y: 6, customValue: 0.9 },
      { x: 1, y: 2, customValue: 0.6 },
      { x: 9, y: 1, customValue: 0.7 },
      { x: 6, y: 8, customValue: 0.3 },
      { x: 4, y: 5, customValue: 0.4 },
      { x: 7, y: 9, customValue: 0.1 },
      { x: 2, y: 7, customValue: 0.6 },
      { x: 5, y: 4, customValue: 0.8 },
      { x: 8, y: 1, customValue: 0.5 },
      { x: 3, y: 9, customValue: 0.4 },
      { x: 9, y: 6, customValue: 0 },
    ],
    xAxis: "x",
    xAxisLabel: "X",
    yAxis: "y",
    yAxisLabel: "Y",
    visualAxis: "customValue",
  },
  component: Heatmap,
} as Meta<typeof Heatmap>;

export const Template: StoryObj<typeof Heatmap> = {};
