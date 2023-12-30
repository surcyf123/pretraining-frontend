import {
  Table,
  Stack,
  Group,
  Pagination,
  Text,
  Select,
  Skeleton,
  ActionIcon,
  Box,
} from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { getSortingIcon } from "../utils";
import type { Vital } from "./utils";
import type { SelectProps, PaginationProps } from "@mantine/core";
import type { PaginationState, SortingState } from "@tanstack/react-table";

export interface VitalTableProps {
  data: Vital[];
  loading?: boolean;
}

export function VitalTable({ data, loading }: VitalTableProps): JSX.Element {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      desc: false,
      id: "Rank",
    },
  ]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Vital>();
    return [
      columnHelper.accessor((row) => row.trust, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Trust",
      }),
      columnHelper.accessor((row) => row.rank, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Rank",
      }),
      columnHelper.accessor((row) => row.consensus, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Consensus",
      }),
      columnHelper.accessor((row) => row.emission, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Emission",
      }),
    ];
  }, []);

  const table = useReactTable({
    state: { sorting, pagination: { pageIndex, pageSize } },
    data,
    columns,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
      <Stack>
        <Box
          style={{
            overflowX: "auto",
          }}
        >
          <Table>
            <Table.Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.Th
                      key={header.id}
                      style={{ cursor: "pointer" }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Group wrap="nowrap">
                        <Text>
                          {header.isPlaceholder === true
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </Text>
                        <ActionIcon size="xs" variant="default">
                          {getSortingIcon(header.column.getIsSorted())}
                        </ActionIcon>
                      </Group>
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
        </Box>
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
      </Stack>
    </Skeleton>
  );
}
