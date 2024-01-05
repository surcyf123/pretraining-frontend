import { downloadData } from "aws-amplify/storage";
import type { NeuronDetails } from "../components/MetagraphTable";
import type { HistoryData, RunDetails } from "../utils";

interface TaoPrice {
  symbol: string;
  price: number;
}

interface TaoPriceChangeStatistics {
  symbol: string;
  priceChange: number;
  priceChangePercent: number;
  prevClosePrice: number;
  lastPrice: number;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  quoteVolume: number;
  openTime: number;
  closeTime: number;
  count?: number | null;
}

export interface Vitals {
  trust: number;
  rank: number;
  consensus: number;
  emission: number;
  netUID: string;
  label: string;
}

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

export interface MetagraphMetadata {
  netuid: number;
  n: number;
  block: number;
  network: string;
  version: string;
}

const BaseURL = "https://api.openpretrain.ai";

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

export async function fetchTaoPriceChangeStatistics(): Promise<TaoPriceChangeStatistics> {
  const rawResponse = await fetch(`${BaseURL}/tao/price-change-stats`);
  const validators = (await rawResponse.json()) as TaoPriceChangeStatistics;
  return validators;
}

export async function fetchTaoPrice(): Promise<TaoPrice> {
  const rawResponse = await fetch(`${BaseURL}/tao/price`);
  const validators = (await rawResponse.json()) as TaoPrice;
  return validators;
}
