import { downloadData } from "aws-amplify/storage";
import type { NeuronDetails } from "../components/MetagraphTable";
import type { HistoryData, RunDetails } from "../utils";

interface TaoStatistics {
  network: string;
  token: string;
  price: string;
  "24h_change": string;
  "24h_volume": string;
  current_supply: string;
  total_supply: string;
  delegated_supply: string;
  market_cap: string;
  next_halvening: string;
  daily_return_per_1000t: string;
  validating_apy: string;
  staking_apy: string;
  last_updated: string;
}

interface MetagraphMetadata {
  netuid: number;
  n: number;
  block: number;
  network: string;
  version: string;
}

export async function fetchTableData(): Promise<Record<string, (RunDetails | null)[]>> {
  const downloadResult = await downloadData({ key: "recent-complete.json" }).result;
  // Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/download/#get-the-text-value-of-downloaded-file
  const text = await downloadResult.body.text(); // Using "downloadResult.body.json()" gives error "Parsing response to json is not implemented."
  const json = JSON.parse(text) as Record<string, (RunDetails | null)[]>;
  return json;
}

export async function fetchLineChartData(fileName: string): Promise<HistoryData[]> {
  const downloadResult = await downloadData({ key: fileName }).result;
  // Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/download/#get-the-text-value-of-downloaded-file
  const text = await downloadResult.body.text(); // Using "downloadResult.body.json()" gives error "Parsing response to json is not implemented."
  const json = JSON.parse(text) as HistoryData[];
  return json;
}

// eslint-disable-next-line import/no-unused-modules
export async function fetchMetagraphData(): Promise<{
  metadata: MetagraphMetadata;
  neuronData: NeuronDetails[];
}> {
  const downloadResult = await downloadData({ key: "metagraph.json" }).result;
  // Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/download/#get-the-text-value-of-downloaded-file
  const text = await downloadResult.body.text(); // Using "downloadResult.body.json()" gives error "Parsing response to json is not implemented."
  const json = JSON.parse(text) as {
    metadata: MetagraphMetadata;
    neuronData: NeuronDetails[];
  };
  return json;
}

// eslint-disable-next-line import/no-unused-modules
export async function fetchTaoStatistics(): Promise<TaoStatistics> {
  const rawResponse = await fetch("https://taostats.io/data.json");
  const [response] = (await rawResponse.json()) as [TaoStatistics];
  return response;
}
