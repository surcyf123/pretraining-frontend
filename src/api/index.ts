import { downloadData } from "aws-amplify/storage";
import type { RunDetails } from "../sample-data/interfaces";

export async function fetchMulitJSON(): Promise<Record<string, (RunDetails | null)[]>> {
  const downloadResult = await downloadData({ key: "multi.json" }).result;
  // Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/download/#get-the-text-value-of-downloaded-file
  const text = await downloadResult.body.text(); // Using "downloadResult.body.json()" gives error "Parsing response to json is not implemented."
  const json = JSON.parse(text) as Record<string, (RunDetails | null)[]>;
  return json;
}
