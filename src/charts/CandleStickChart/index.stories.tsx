import { CandleStickChart } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "CandleStickChart",
  component: CandleStickChart,
  args: {
    style: { height: "100vh" },
    title: "Candle Stick",
    xAxis: "time",
    yAxis: "data",
  },
} as Meta<typeof CandleStickChart>;

export const Template: StoryObj<typeof CandleStickChart> = {};
