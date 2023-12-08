import { BestLossChart } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "BestLossChart",
  component: BestLossChart,
  args: {
    data: {
      "validator-76-OVT415A76F": [
        {
          key: "validator-76-OVT415A76F",
          best_average_loss: 3.524508271366358,
          timestamp: 1701893764.8804958,
        },
        {
          key: "validator-76-OVT415A76F",
          best_average_loss: 3.537504454092546,
          timestamp: 1701894282.4713688,
        },
        {
          key: "validator-76-OVT415A76F",
          best_average_loss: 3.609995004405146,
          timestamp: 1701894669.1734045,
        },
        {
          key: "validator-76-OVT415A76F",
          best_average_loss: 3.660256296655406,
          timestamp: 1701894974.2973866,
        },
        {
          key: "validator-76-OVT415A76F",
          best_average_loss: 3.464671502289949,
          timestamp: 1701895256.5180357,
        },
        {
          key: "validator-76-OVT415A76F",
          best_average_loss: 3.4692174636565887,
          timestamp: 1701895550.3780186,
        },
        {
          key: "validator-76-OVT415A76F",
          best_average_loss: 3.5284934306845948,
          timestamp: 1701895874.6015365,
        },
      ],
      "validator-242-VEDAPU1WBE": [
        {
          key: "validator-242-VEDAPU1WBE",
          best_average_loss: 3.6487389987753343,
          timestamp: 1701720297.882234,
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
