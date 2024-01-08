import type { NeuronDetails } from "../components/MetagraphTable";
import type { LineChartData, RunDetails } from "../utils";

export type Candlestick = [number, number, number, number, number]; // [Date, Opening price, Highest price, Lowest price, Closing price]

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
  const rawResponse = await fetch(`${BaseURL}/wandb/validator-runs/3`);
  const validatorRuns = (await rawResponse.json()) as Record<string, (RunDetails | null)[]>;
  return validatorRuns;
}

export async function fetchLineChartData(days: number): Promise<LineChartData[]> {
  const rawResponse = await fetch(`${BaseURL}/wandb/line-chart/${days}`);
  const lineChartData = (await rawResponse.json()) as LineChartData[];
  return lineChartData;
}

export async function fetchMetagraphMetadata(netUID: number): Promise<MetagraphMetadata> {
  const rawResponse = await fetch(`${BaseURL}/metadata/${netUID}`);
  const metadata = (await rawResponse.json()) as MetagraphMetadata;
  return metadata;
}

export async function fetchNeuronData(netUID: number): Promise<NeuronDetails[]> {
  const rawResponse = await fetch(`${BaseURL}/neurons/${netUID}`);
  const neuronDetails = (await rawResponse.json()) as NeuronDetails[];
  return neuronDetails;
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
  const output = (await rawResponse.json()) as Record<string, number>[];
  return output;
}

export async function fetchTaoPriceChangeStatistics(): Promise<TaoPriceChangeStatistics> {
  const rawResponse = await fetch(`${BaseURL}/tao/price-change-stats`);
  const output = (await rawResponse.json()) as TaoPriceChangeStatistics;
  return output;
}

export async function fetchTaoPrice(): Promise<TaoPrice> {
  const rawResponse = await fetch(`${BaseURL}/tao/price`);
  const output = (await rawResponse.json()) as TaoPrice;
  return output;
}

export async function fetchTaoCandlestick(): Promise<Candlestick[]> {
  const rawResponse = await fetch(`${BaseURL}/tao/candlestick`);
  const output = (await rawResponse.json()) as Candlestick[];
  return output;
}
