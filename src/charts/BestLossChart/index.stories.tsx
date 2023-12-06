import { BestLossChart } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "BestLossChart",
  component: BestLossChart,
  args: {
    data: {
      "validator-242-VEDAPU1WBE": [
        {
          timestamp: 1701720297882.2341,
          pages: [717372617, 135860622, 528121852],
          uids: [157, 159],
          uid_data: {
            "157": {
              uid: 157,
              runid: "fxl2sb8g",
              timestamp: 1701719809.1175036,
              last_update: 1701719809.1175027,
              average_loss: 3.651201055955517,
              win_rate: 0.9922480620155039,
              win_total: 128,
              weight: 0.09808850288391113,
              average_losses: [],
              blacklisted: false,
            },
            "159": {
              uid: 159,
              runid: "qb0cmhw5",
              timestamp: 1701719827.143619,
              last_update: 1701719827.1436186,
              average_loss: 3.6487389987753343,
              win_rate: 0.007751937984496124,
              win_total: 1,
              weight: 0.0019114948809146881,
              average_losses: [],
              blacklisted: false,
            },
          },
          best_average_loss: 3.6487389987753343,
          best_average_loss_uid: null,
        },
      ],
      "validator-242-Y1IQRIFSRO": [
        {
          timestamp: 1701661637844.359,
          pages: [61048983, 708877580, 454799842],
          uids: [137, 139],
          uid_data: {
            "137": {
              uid: 137,
              runid: "l2f4e1qf",
              timestamp: 1701661124,
              last_update: 1701661142.8175664,
              average_loss: 3.60257410132972,
              win_rate: 0.0072992700729927005,
              win_total: 1,
              weight: 0.0019047167152166367,
              average_losses: [],
              blacklisted: false,
            },
            "139": {
              uid: 139,
              runid: "mdwsmx3h",
              timestamp: 1701565714,
              last_update: 1701661163.0466585,
              average_loss: 3.5966395774896998,
              win_rate: 0.9927007299270073,
              win_total: 136,
              weight: 0.09809529036283493,
              average_losses: [],
              blacklisted: false,
            },
          },
          best_average_loss: 3.5966395774896998,
          best_average_loss_uid: null,
        },
      ],
    },
    yAxis: "best_average_loss",
    xAxis: "timestamp",
    yAxisTitle: "Best average loss",
    xAxisTitle: "Time",
    style: { height: "100vh" },
  },
} as Meta<typeof BestLossChart>;

export const Template: StoryObj<typeof BestLossChart> = {};
