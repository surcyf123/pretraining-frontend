import { downloadData } from "aws-amplify/storage";
import type { MetagraphDetails } from "../../components/MetagraphTable";
import type { HistoryData, RunDetails } from "../../utils";

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

  const neuronData = json.neuron_data.map(
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
      eachNeuronRank: each_neuron_ranks.toFixed(4),
      eachNeuronIncentives: each_neuron_incentives.toFixed(4),
      eachNeuronEmission: each_neuron_emission.toFixed(4),
      eachNeuronConsensus: each_neuron_consensus.toFixed(4),
      eachNeuronTrust: each_neuron_trust.toFixed(4),
      eachNeuronValidatorTrust: each_neuron_validator_trust.toFixed(4),
      eachNeuronDividends: each_neuron_dividends.toFixed(4),
      bonds: (each_neuron_bonds ?? 0).toFixed(4),
      eachNeuronWeight: (each_neuron_weights ?? 0).toFixed(4),
      eachNeuronStake: each_neuron_stake,
      eachNeuronHotKeys: each_neuron_hotkeys,
      eachNeuronColdKeys: each_neuron_coldkeys,
    }),
  );
  return {
    neuronData,
    metadata: json.metadata,
  };
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
