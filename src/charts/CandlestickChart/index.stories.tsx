import { CandlestickData } from "./utils";
import { CandlestickChart } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "CandlestickChart",
  component: CandlestickChart,
  args: {
    style: { height: "100vh" },
    title: "Candle Stick",
    xAxis: "time",
    yAxis: "data",
    data: CandlestickData,
  },
} as Meta<typeof CandlestickChart>;

export const Template: StoryObj<typeof CandlestickChart> = {};
