import { ActionIcon, Group, Select, Stack, Table, Text } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronsLeft,
  IconChevronRight,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { StatisticsWithID } from "../../sample-data/state";
import type { SortingState, PaginationState } from "@tanstack/react-table";

export function StatisticsTable({ data }: { data: StatisticsWithID[] }): JSX.Element {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<StatisticsWithID>();
    return [
      columnHelper.accessor((row) => row.id, {
        cell: (info) => info.getValue(),
        id: "UID",
      }),
      columnHelper.accessor((row) => row.loss, {
        cell: (info) => info.getValue(),
        id: "Loss",
      }),
      columnHelper.accessor((row) => row.timestamp, {
        cell: (info) => info.getValue(),
        id: "Timestamp",
      }),
    ];
  }, []);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    pageCount: -1,
    state: { sorting, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <Stack>
      <Table>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {header.isPlaceholder === true
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted().valueOf().toString()] ?? null}
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
      <Group justify="flex-end">
        <Group>
          <ActionIcon variant="default" title="Show first">
            <IconChevronLeft />
          </ActionIcon>
          <ActionIcon variant="default" title="Show previous">
            <IconChevronsLeft />
          </ActionIcon>
          <ActionIcon variant="default" title="Show next">
            <IconChevronRight />
          </ActionIcon>
          <ActionIcon variant="default" title="Show last">
            <IconChevronsRight />
          </ActionIcon>
        </Group>
        <Text>{`${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}</Text>
        <Select
          size="sm"
          placeholder="Page size"
          data={[
            { value: "10", label: "Show 10" },
            { value: "50", label: "Show 50" },
            { value: "100", label: "Show 100" },
          ]}
          value={pageSize.toString()}
        />
      </Group>
    </Stack>
  );
}
