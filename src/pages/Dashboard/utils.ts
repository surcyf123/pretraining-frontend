import { downloadData } from "aws-amplify/storage";
import type { MetagraphDetails } from "../../components/MetagraphTable";
import type { HistoryData, RunDetails } from "../../utils";

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

interface NeuronDetails {
  each_neuron_uid: number;
  each_neuron_stake: number;
  each_neuron_ranks: number;
  each_neuron_incentives: number;
  each_neuron_emission: number;
  each_neuron_consensus: number;
  each_neuron_trust: number;
  each_neuron_validator_trust: number;
  each_neuron_dividends: number;
  each_neuron_hotkeys: string;
  each_neuron_coldkeys: string;
  each_neuron_bonds?: number;
  each_neuron_weights?: number;
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
  neuronData: MetagraphDetails[];
}> {
  const downloadResult = await downloadData({ key: "metagraph.json" }).result;
  // Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/download/#get-the-text-value-of-downloaded-file
  const text = await downloadResult.body.text(); // Using "downloadResult.body.json()" gives error "Parsing response to json is not implemented."
  const json = JSON.parse(text) as {
    metadata: MetagraphMetadata;
    neuron_data: NeuronDetails[];
  };

  const neuronData = json.neuron_data.map<MetagraphDetails>(
    ({
      each_neuron_coldkeys,
      each_neuron_weights,
      each_neuron_consensus,
      each_neuron_dividends,
      each_neuron_emission,
      each_neuron_hotkeys,
      each_neuron_incentives,
      each_neuron_ranks,
      each_neuron_stake,
      each_neuron_trust,
      each_neuron_uid,
      each_neuron_validator_trust,
      each_neuron_bonds,
    }) => ({
      neuronID: each_neuron_uid,
      neuronRank: each_neuron_ranks,
      neuronIncentives: each_neuron_incentives,
      neuronEmission: each_neuron_emission,
      neuronConsensus: each_neuron_consensus,
      neuronTrust: each_neuron_trust,
      neuronValidatorTrust: each_neuron_validator_trust,
      neuronDividends: each_neuron_dividends,
      bonds: each_neuron_bonds ?? 0,
      neuronWeight: each_neuron_weights ?? 0,
      neuronStake: each_neuron_stake,
      neuronHotKeys: each_neuron_hotkeys,
      neuronColdKeys: each_neuron_coldkeys,
    }),
  );
  return {
    neuronData,
    metadata: json.metadata,
  };
}

// eslint-disable-next-line import/no-unused-modules
export async function fetchTaoStatistics(): Promise<TaoStatistics> {
  const rawResponse = await fetch("https://taostats.io/data.json");
  const [response] = (await rawResponse.json()) as [TaoStatistics];
  return response;
}

// eslint-disable-next-line import/no-unused-modules
export function parseRunDetails(jsonData: Record<string, (RunDetails | null)[]>): Record<string, RunDetails[]> {
  return Object.entries(jsonData).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
        .filter((ele): ele is RunDetails => typeof ele?.best_average_loss === "number")
        .map((ele) => ({ ...ele, timestamp: ele.timestamp * 1000 })),
    }),
    {},
  );
}
