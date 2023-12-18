import { Table, Stack } from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export interface MetagraphDetails {
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
  eachNeuronStake: number;
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
  ColumnHelper.accessor((row) => row.eachNeuronStake, {
    cell: (info) => info.getValue(),
    id: "Stake",
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

export interface MetagraphTableProps {
  data: MetagraphDetails[];
}

export function MetagraphTable({ data }: MetagraphTableProps): JSX.Element {
  const table = useReactTable({
    data,
    columns: Columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack>
      <Table>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id} style={{ cursor: "pointer" }}>
                  {header.isPlaceholder === true
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
