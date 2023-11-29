import { downloadData } from "aws-amplify/storage";
import type { RunDetails } from "../sample-data/interfaces";

export async function fetchMulitJSON(): Promise<Record<string, (RunDetails | null)[]>> {
  const downloadResult = await downloadData({ key: "multi.json" }).result;
  const text = await downloadResult.body.text();
  const json = JSON.parse(text) as Record<string, (RunDetails | null)[]>;
  return json;
}
