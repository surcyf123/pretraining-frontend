import { scaleOrdinal } from "d3-scale";
import { schemeBrBG } from "d3-scale-chromatic";
import type { ScaleOrdinal } from "d3-scale";

export function colorGenerator(): ScaleOrdinal<string, string> {
  const generator = scaleOrdinal(schemeBrBG[11]);
  return generator;
}
