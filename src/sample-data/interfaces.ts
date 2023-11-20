export interface UIDDetails {
  uid: number;
  runid: string;
  timestamp: number;
  average_losses: (number | null)[];
  average_loss: number | null;
  win_rate: number;
  win_total: number;
  last_update: number;
  blacklisted: boolean;
  weight: number | null;
}

export interface RunDetails {
  uid_data: Record<string, UIDDetails>;
  timestamp: number;
  pages: number[];
  uids: number[];
  best_average_loss: number | null;
  best_average_loss_uid: number | null;
}
