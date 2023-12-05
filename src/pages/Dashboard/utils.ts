import type { RunDetails } from "../../sample-data/interfaces";

export function ParseMultiJSON(jsonData: Record<string, (RunDetails | null)[]>): Record<string, RunDetails[]> {
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
