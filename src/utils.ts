export interface UIDDetails {
  uid: number;
  block: number;
  average_loss: number;
  win_rate: number;
  win_total: number;
  weight: number;
}

export interface RunDetails {
  timestamp: number;
  uids: number[];
  uid_data: Record<string, UIDDetails | undefined>;
  pages: number[];
  best_average_loss: number | null;
}

export interface LineChartData {
  key: string;
  best_average_loss: number | null;
  timestamp: number;
  smooth_best_average_loss: number | null;
}
