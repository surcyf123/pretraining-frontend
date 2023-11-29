import { downloadData } from 'aws-amplify/storage';
import type { RunDetails } from '../sample-data/interfaces';

// eslint-disable-next-line import/no-unused-modules
export async function fetchMulitJSON():  Promise<Record<string, RunDetails[]>>{
  const downloadResult = await downloadData({ key: "multi.json" }).result;
  const json = await downloadResult.body.json() as Record<string, RunDetails[]>;
  return json
}
