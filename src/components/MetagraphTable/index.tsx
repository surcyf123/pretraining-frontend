import { Table, Group, Pagination, Text, Select, Skeleton, Stack } from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { SelectProps, PaginationProps } from "@mantine/core";
import type { PaginationState } from "@tanstack/react-table";

export interface MetagraphDetails {
  neuronID: number;
  neuronRank: number;
  neuronIncentives: number;
  neuronEmission: number;
  neuronConsensus: number;
  neuronTrust: number;
  neuronValidatorTrust: number;
  neuronDividends: number;
  bonds: number;
  neuronWeight: number;
  neuronStake: number;
  neuronHotKeys: string;
  neuronColdKeys: string;
}

export interface MetagraphTableProps {
  data: MetagraphDetails[];
  loading?: boolean;
}

export function MetagraphTable({ data, loading }: MetagraphTableProps): JSX.Element {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<MetagraphDetails>();
    return [
      columnHelper.accessor((row) => row.neuronID, {
        cell: (info) => info.getValue(),
        id: "ID",
      }),
      columnHelper.accessor((row) => row.neuronRank, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Rank",
      }),
      columnHelper.accessor((row) => row.neuronIncentives, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Incentives",
      }),
      columnHelper.accessor((row) => row.neuronEmission, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Emission",
      }),
      columnHelper.accessor((row) => row.neuronConsensus, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Consensus",
      }),
      columnHelper.accessor((row) => row.neuronTrust, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Trust",
      }),
      columnHelper.accessor((row) => row.neuronValidatorTrust, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Validator Trust",
      }),
      columnHelper.accessor((row) => row.neuronDividends, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Dividends",
      }),
      columnHelper.accessor((row) => row.bonds, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Bonds",
      }),
      columnHelper.accessor((row) => row.neuronWeight, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Weight",
      }),
      columnHelper.accessor((row) => row.neuronStake, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Stake",
      }),
      columnHelper.accessor((row) => row.neuronHotKeys, {
        cell: (info) => info.getValue(),
        id: "Hotkeys",
      }),
      columnHelper.accessor((row) => row.neuronColdKeys, {
        cell: (info) => info.getValue(),
        id: "Coldkeys",
      }),
    ];
  }, []);

  const table = useReactTable({
    state: { pagination: { pageIndex, pageSize } },
    data,
    columns,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handlePageSizeChange: SelectProps["onChange"] = (value) => {
    const parsedPageSize = Number.parseInt(value ?? "", 10);
    if (Number.isNaN(parsedPageSize) === false) {
      table.setPageSize(parsedPageSize);
    }
  };

  const handlePageChange: PaginationProps["onChange"] = (page) => {
    table.setPageIndex(page - 1);
  };

  return (
    <Skeleton visible={loading ?? false}>
      <Stack
        style={{
          overflow: "auto",
        }}
      >
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
      <Group justify="flex-end">
        <Pagination
          value={table.getState().pagination.pageIndex + 1}
          total={table.getPageCount()}
          onChange={handlePageChange}
        />
        <Text>{`${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}</Text>
        <Select
          size="sm"
          placeholder="Page size"
          allowDeselect={false}
          data={[
            { value: "10", label: "Show 10" },
            { value: "50", label: "Show 50" },
            { value: "100", label: "Show 100" },
          ]}
          value={pageSize.toString()}
          onChange={handlePageSizeChange}
        />
      </Group>
    </Skeleton>
  );
}
