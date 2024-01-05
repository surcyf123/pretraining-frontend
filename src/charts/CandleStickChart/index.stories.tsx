import { RawCandleStickData, transformData } from "./utils";
import { CandleStickChart } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "CandlestickChart",
  component: CandlestickChart,
  args: {
    style: { height: "100vh" },
    title: "Candle Stick",
    xAxis: "time",
    yAxis: "data",
    data: transformData(RawCandleStickData),
  },
} as Meta<typeof CandleStickChart>;

export const Template: StoryObj<typeof CandleStickChart> = {};
