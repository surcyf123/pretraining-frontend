// "uid": 49,
// "runid": "at6104f3",
// "timestamp": 1699782321,
// "average_losses": [8.831217924753824, 8.843376654165763],
// "average_loss": 8.837297289459794,
// "win_rate": 1.0,
// "win_total": 51

// eslint-disable-next-line import/no-unused-modules
export interface UIDDetails {
  uid: number;
  runid: string;
  timestamp: number;
  average_losses: number[];
  average_loss: number;
  win_rate: number;
  win_total: number;
}

// eslint-disable-next-line import/no-unused-modules
export interface RunDetails {
  uid_data: Record<string, UIDDetails>;
  timestamp: number;
  pages: number[];
  uids: number[];
  best_average_loss: number;
  best_average_loss_uid: number;
}
