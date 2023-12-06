import { StatisticsTable } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "StatisticsTable",
  component: StatisticsTable,
  args: {
    data: [
      {
        uid: 0,
        runid: "1snsyokb",
        timestamp: 1701859321000,
        last_update: 1701859346.7215986,
        average_loss: 3.5849628713395862,
        win_rate: 0.40236597783767597,
        win_total: 2687,
        weight: 0.019770139828324318,
      },
      {
        uid: 1,
        runid: "zcc1112v",
        timestamp: 1701862448035.9922,
        last_update: 1701862448.035992,
        average_loss: 3.719227744520997,
        win_rate: 0.21753123816736084,
        win_total: 1149,
        weight: 0.0007211240008473396,
      },
      {
        uid: 2,
        runid: "m35y90i3",
        timestamp: 1701862468430.0679,
        last_update: 1701862468.4300673,
        average_loss: 3.7280542027178427,
        win_rate: 0.17379780386217342,
        win_total: 918,
        weight: 0.0005949300248175859,
      },
      {
        uid: 3,
        runid: "expsffwb",
        timestamp: 1701859407084.2405,
        last_update: 1701859407.0842397,
        average_loss: 3.772797603538071,
        win_rate: 0.16313184870979144,
        win_total: 923,
        weight: 0.0006359354592859745,
      },
    ],
  },
} as Meta<typeof StatisticsTable>;

export const Template: StoryObj<typeof StatisticsTable> = {};
