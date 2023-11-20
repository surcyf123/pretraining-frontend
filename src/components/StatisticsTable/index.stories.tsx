import { Data } from "../../sample-data/state";
import { StatisticsTable } from ".";
import type { UIDDetails } from "../../sample-data/interfaces";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "StatisticsTable",
  component: StatisticsTable,
  args: {
    data: Data.flatMap<UIDDetails>((ele) =>
      Object.values(ele.uid_data).filter(
        (uid_details): uid_details is UIDDetails => uid_details !== undefined,
      ),
    ),
  },
} as Meta<typeof StatisticsTable>;

export const Template: StoryObj<typeof StatisticsTable> = {};
