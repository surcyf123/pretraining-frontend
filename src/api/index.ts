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

export interface Vitals {
  trust: number;
  rank: number;
  consensus: number;
  emission: number;
  netUID: string;
  label: string;
}

// eslint-disable-next-line import/no-unused-modules
export interface Validator {
  uid: number;
  stake: number;
  hotkey: string;
  coldkey: string;
  address: string;
  name?: string;
  url?: string;
  description?: string;
  signature?: string;
  [key: string]: string | number | undefined;
}

const BaseURL = "https://api.openpretrain.ai";

export interface MetagraphMetadata {
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

export async function fetchMetagraphData(): Promise<{
  metadata: MetagraphMetadata;
  neuronData: NeuronDetails[];
}> {
  const downloadResult = await downloadData({ key: "metagraph.json" }).result;
  // Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/download/#get-the-text-value-of-downloaded-file
  const text = await downloadResult.body.text(); // Using "downloadResult.body.json()" gives error "Parsing response to json is not implemented."

  const json = JSON.parse(text) as {
    metadata: [MetagraphMetadata];
    neuronData: NeuronDetails[];
  };

  const [metadata] = json.metadata;

  return {
    metadata,
    neuronData: json.neuronData,
  };
}

export async function fetchTaoStatistics(): Promise<TaoStatistics> {
  const rawResponse = await fetch("https://taostats.io/data.json");
  const [response] = (await rawResponse.json()) as [TaoStatistics];
  return response;
}

export async function fetchSubnetVitals(): Promise<Vitals[]> {
  const rawResponse = await fetch(`${BaseURL}/vitals`);
  const vitals = (await rawResponse.json()) as Vitals[];
  return vitals;
}

export async function fetchValidators(): Promise<Validator[]> {
  const rawResponse = await fetch(`${BaseURL}/validators`);
  const validators = (await rawResponse.json()) as Validator[];
  return validators;
}

export async function fetchHeatmapData(): Promise<Record<string, number>[]> {
  const rawResponse = await fetch(`${BaseURL}/weights/0`);
  const validators = (await rawResponse.json()) as Record<string, number>[];
  return validators;
}
