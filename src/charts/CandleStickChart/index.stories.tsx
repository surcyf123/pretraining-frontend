import { RawCandleStickData, splitData } from "./utils";
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
    data: splitData(RawCandleStickData),
  },
} as Meta<typeof CandleStickChart>;

export const Template: StoryObj<typeof CandleStickChart> = {};
