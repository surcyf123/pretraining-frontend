import { mean } from "d3-array";
import type { NeuronDetails } from "../../components/MetagraphTable";
import type { RunDetails } from "../../utils";

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

export function calculateAverageValidatorTrust(neuronDetails: NeuronDetails[]): number | undefined {
  const neurons = neuronDetails.filter((ele) => ele.stake > 20000);
  const averageTrust = mean(neurons, (ele) => ele.validatorTrust);
  return averageTrust;
}
