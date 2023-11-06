/* eslint-disable import/no-unused-modules */
export interface Statistics {
  loss?: number | null;
  "Win Percentage"?: number | null;
  run_id?: string | null;
  hotkey?: string | null;
}

export interface StatisticsReport {
  best_average_loss: number;
  best_average_loss_uid: number;
  pages: number[];
  timestamp: number;
  data: Record<string, Statistics>;
}

export interface CompleteStatistics extends Statistics {
  id: string;
  timestamp: number;
}

export const Data: StatisticsReport[] = [
  {
    data: {
      "213": { loss: 3.9612676734509678, "Win Percentage": 0.8043478260869565 },
      "215": { loss: 3.9901736715565557, "Win Percentage": 0.06521739130434782 },
      "223": { loss: 3.9673598693764727, "Win Percentage": 0.13043478260869565 },
      "251": { loss: 3.9901736715565557 },
      "255": { loss: 3.9901736715565557 },
    },
    best_average_loss: 3.9612676734509678,
    best_average_loss_uid: 213,
    pages: [754782003, 291736406],
    timestamp: 1699150746.1623785,
  },
  {
    data: {
      "213": { loss: 4.037965269412025, "Win Percentage": 0.6949152542372882 },
      "215": { loss: 4.057634167752023, "Win Percentage": 0.15254237288135594 },
      "223": { loss: 4.047979156849748, "Win Percentage": 0.15254237288135594 },
      "251": { loss: 4.057634167752023 },
      "255": { loss: 4.057634167752023 },
    },
    best_average_loss: 4.037965269412025,
    best_average_loss_uid: 213,
    pages: [319180285, 145462016],
    timestamp: 1699150790.126982,
  },
  {
    data: {
      "213": { loss: 3.959765259708677, "Win Percentage": 0.6785714285714286 },
      "215": { loss: 3.985326805285045, "Win Percentage": 0.08928571428571429 },
      "223": { loss: 3.9683496185711453, "Win Percentage": 0.23214285714285715 },
      "251": { loss: 3.985326805285045 },
      "255": { loss: 3.985326805285045 },
    },
    best_average_loss: 3.959765259708677,
    best_average_loss_uid: 213,
    pages: [397775673, 472841080],
    timestamp: 1699150833.287836,
  },
];
