import { CategoricalBarChart } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "CategoricalBarChart",
  component: CategoricalBarChart,
  args: {
    style: { height: "100vh" },
    xAxis: "uid",
    yAxis: "average_loss",
    xAxisTitle: "UID",
    yAxisTitle: "Loss",
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
        timestamp: 1701859374559.4346,
        last_update: 1701859374.5594344,
        average_loss: 3.604722582524823,
        win_rate: 0.14650537634408603,
        win_total: 654,
        weight: 0.0006210468709468842,
      },
      {
        uid: 2,
        runid: "m35y90i3",
        timestamp: 1701859395669.4443,
        last_update: 1701859395.6694438,
        average_loss: 3.61450017844477,
        win_rate: 0.09296594982078853,
        win_total: 415,
        weight: 0.0004913699813187122,
      },
      {
        uid: 3,
        runid: "7mr3fujk",
        timestamp: 1701859387000,
        last_update: 1701859393.8786952,
        average_loss: 3.5814196571471197,
        win_rate: 0.3435160227613058,
        win_total: 2294,
        weight: 0.0022039604373276234,
      },
    ],
  },
} as Meta<typeof CategoricalBarChart>;

export const Template: StoryObj<typeof CategoricalBarChart> = {};
