import { Table, Stack } from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export interface MetagraphDetails {
  neuronID: number;
  neuronRank: string;
  neuronIncentives: string;
  neuronEmission: string;
  neuronConsensus: string;
  neuronTrust: string;
  neuronValidatorTrust: string;
  neuronDividends: string;
  bonds: string;
  neuronWeight: string;
  neuronHotKeys: string;
  neuronColdKeys: string;
  neuronStake: string;
}

const ColumnHelper = createColumnHelper<MetagraphDetails>();

const Columns = [
  ColumnHelper.accessor((row) => row.neuronID, {
    cell: (info) => info.getValue(),
    id: "ID",
  }),
  ColumnHelper.accessor((row) => row.neuronRank, {
    cell: (info) => info.getValue(),
    id: "Rank",
  }),
  ColumnHelper.accessor((row) => row.neuronIncentives, {
    cell: (info) => info.getValue(),
    id: "Incentives",
  }),
  ColumnHelper.accessor((row) => row.neuronEmission, {
    cell: (info) => info.getValue(),
    id: "Emission",
  }),
  ColumnHelper.accessor((row) => row.neuronConsensus, {
    cell: (info) => info.getValue(),
    id: "Consensus",
  }),
  ColumnHelper.accessor((row) => row.neuronTrust, {
    cell: (info) => info.getValue(),
    id: "Trust",
  }),
  ColumnHelper.accessor((row) => row.neuronValidatorTrust, {
    cell: (info) => info.getValue(),
    id: "Validator Trust",
  }),
  ColumnHelper.accessor((row) => row.neuronDividends, {
    cell: (info) => info.getValue(),
    id: "Dividends",
  }),
  ColumnHelper.accessor((row) => row.bonds, {
    cell: (info) => info.getValue(),
    id: "Bonds",
  }),
  ColumnHelper.accessor((row) => row.neuronWeight, {
    cell: (info) => info.getValue(),
    id: "Weight",
  }),
  ColumnHelper.accessor((row) => row.neuronHotKeys, {
    cell: (info) => info.getValue(),
    id: "Hotkeys",
  }),
  ColumnHelper.accessor((row) => row.neuronColdKeys, {
    cell: (info) => info.getValue(),
    id: "Coldkeys",
  }),
  ColumnHelper.accessor((row) => row.neuronStake, {
    cell: (info) => info.getValue(),
    id: "Stake",
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
