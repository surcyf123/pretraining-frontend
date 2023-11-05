import { DummyData } from "../../sample-data/state";
import { StatisticsTable } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "StatisticsTable",
  component: StatisticsTable,
  args: {
    data: Object.entries(DummyData).map(([key, value]) => ({ id: key, ...value })),
  },
} as Meta<typeof StatisticsTable>;

export const Template: StoryObj<typeof StatisticsTable> = {};
