export interface Statistics {
  loss?: number | null;
  timestamp?: string | null;
  run_id?: string | null;
  hotkey?: string | null;
}

export type StatisticsWithID = Statistics & { id: string };

// eslint-disable-next-line import/no-unused-modules
export const DummyData: Record<string, Statistics> = {
  "41": { loss: Math.random() * 4, timestamp: "2023-11-03T16:33:06", run_id: null, hotkey: null },
  "54": { loss: Math.random() * 4, timestamp: "2023-11-03T16:32:06", run_id: null, hotkey: null },
  "61": { loss: Math.random() * 4, timestamp: "2023-11-03T16:31:06", run_id: null, hotkey: null },
  "64": { loss: Math.random() * 4, timestamp: "2023-11-03T16:30:06", run_id: null, hotkey: null },
  "69": { loss: Math.random() * 4, timestamp: "2023-11-03T16:29:06", run_id: null, hotkey: null },
  "170": { loss: Math.random() * 4, timestamp: "2023-11-03T16:28:06", run_id: null, hotkey: null },
  "171": { loss: Math.random() * 4, timestamp: "2023-11-03T16:27:06", run_id: null, hotkey: null },
  "217": { loss: Math.random() * 4, timestamp: "2023-11-03T16:26:06", run_id: null, hotkey: null },
  "218": { loss: Math.random() * 4, timestamp: "2023-11-03T16:25:06", run_id: null, hotkey: null },
  "223": {
    loss: 3.9601204687235305,
    timestamp: "2023-11-03T16:24:06",
    run_id: "1bog88ak",
    hotkey: "5HdzazKU7nRzhH5dZDZdHMW5j2EFZXV9eA1fkYq7Pe5HQTpM",
  },
  "255": {
    loss: 3.9627705398870976,
    timestamp: "2023-11-03T16:23:06",
    run_id: "x4azdm61",
    hotkey: "5EZGRiRtTuxipeSq1vgwZgkwu4kdj7Lh1U6Yu7ZerRMQkE19",
  },
};
