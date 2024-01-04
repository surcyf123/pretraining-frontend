import { CandleStickChart } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "CandleStickChart",
  component: CandleStickChart,
  args: {
    style: { height: "100vh" },
  },
} as Meta<typeof CandleStickChart>;

export const Template: StoryObj<typeof CandleStickChart> = {};
