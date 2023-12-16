import { createColumnHelper } from "@tanstack/react-table";

interface MetagraphDetails {
  neuronID: number;
  eachNeuronRank: string;
  eachNeuronIncentives: string;
  eachNeuronEmission: string;
  eachNeuronConsensus: string;
  eachNeuronTrust: string;
  eachNeuronValidatorTrust: string;
  eachNeuronDividends: string;
  bonds: string;
  eachNeuronWeight: string;
  eachNeuronHotKeys: string;
  eachNeuronColdKeys: string;
}

const ColumnHelper = createColumnHelper<MetagraphDetails>();

const Columns = [
  ColumnHelper.accessor((row) => row.neuronID, {
    cell: (info) => info.getValue(),
    id: "ID",
  }),
  ColumnHelper.accessor((row) => row.eachNeuronRank, {
    cell: (info) => info.getValue(),
    id: "Rank",
  }),
  ColumnHelper.accessor((row) => row.eachNeuronIncentives, {
    cell: (info) => info.getValue(),
    id: "Incentives",
  }),
  ColumnHelper.accessor((row) => row.eachNeuronEmission, {
    cell: (info) => info.getValue(),
    id: "Emission",
  }),
  ColumnHelper.accessor((row) => row.eachNeuronConsensus, {
    cell: (info) => info.getValue(),
    id: "Consensus",
  }),
  ColumnHelper.accessor((row) => row.eachNeuronTrust, {
    cell: (info) => info.getValue(),
    id: "Trust",
  }),
  ColumnHelper.accessor((row) => row.eachNeuronValidatorTrust, {
    cell: (info) => info.getValue(),
    id: "Validator Trust",
  }),
  ColumnHelper.accessor((row) => row.eachNeuronDividends, {
    cell: (info) => info.getValue(),
    id: "Dividends",
  }),
  ColumnHelper.accessor((row) => row.bonds, {
    cell: (info) => info.getValue(),
    id: "Bonds",
  }),
  ColumnHelper.accessor((row) => row.eachNeuronWeight, {
    cell: (info) => info.getValue(),
    id: "Weight",
  }),
  ColumnHelper.accessor((row) => row.eachNeuronHotKeys, {
    cell: (info) => info.getValue(),
    id: "Hotkeys",
  }),
  ColumnHelper.accessor((row) => row.eachNeuronColdKeys, {
    cell: (info) => info.getValue(),
    id: "Coldkeys",
  }),
];

console.log(Columns); // remove this

export function MetagraphTable(): JSX.Element {
  return <>Metagraph</>;
}
