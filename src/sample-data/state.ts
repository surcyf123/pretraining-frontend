import MultiJSONData from "./multi.json";
import type { RunDetails } from "./interfaces";

export const MultiJSON = MultiJSONData as Record<string, RunDetails[]>;

export const Data = Object.values(MultiJSON).flat();
