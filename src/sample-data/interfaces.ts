export interface UIDDetails {
  uid: number;
  runid: string;
  timestamp: number;
  average_losses: number[];
  average_loss: number;
  win_rate: number;
  win_total: number;
}

export interface RunDetails {
  uid_data: Record<string, UIDDetails>;
  timestamp: number;
  pages: number[];
  uids: number[];
  best_average_loss: number;
  best_average_loss_uid: number;
}
