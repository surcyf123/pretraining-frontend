import { Data } from "../../sample-data/state";
import { StatisticsTable } from ".";
import type { CompleteStatistics} from "../../sample-data/state";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "StatisticsTable",
  component: StatisticsTable,
  args: {
    data: Data.flatMap(({ data, timestamp }) =>
    Object.entries(data).map<CompleteStatistics>(([key, value]) => ({
      id: key,
      timestamp,
      ...value,
    })),
  )
  },
} as Meta<typeof StatisticsTable>;

export const Template: StoryObj<typeof StatisticsTable> = {};
