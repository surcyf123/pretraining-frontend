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
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { UIDDetails } from "../../sample-data/interfaces";
import type { SelectProps } from "@mantine/core";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import type { MouseEventHandler } from "react";

export function StatisticsTable({ data }: { data: UIDDetails[] }): JSX.Element {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<UIDDetails>();
    return [
      columnHelper.accessor((row) => row.uid, {
        cell: (info) => info.getValue(),
        id: "UID",
      }),
      columnHelper.accessor((row) => row.timestamp, {
        cell: (info) =>
          new Date(info.getValue()).toLocaleString(undefined, {
            dateStyle: "short",
            timeStyle: "medium",
            hour12: true,
          }),
        id: "Timestamp",
      }),
      columnHelper.accessor((row) => row.average_loss, {
        cell: (info) => (info.getValue() ?? NaN).toFixed(4),
        id: "Loss",
      }),
      columnHelper.accessor((row) => row.win_rate, {
        cell: (info) =>
          info.getValue().toLocaleString(undefined, {
            style: "percent",
            maximumFractionDigits: 2,
          }),
        id: "Win Percentage",
      }),
      columnHelper.accessor((row) => row.weight, {
        cell: (info) => (info.getValue() ?? NaN).toFixed(4),
        id: "Weight",
      }),
    ];
  }, []);

  const [sorting, setSorting] = useState<SortingState>([
    {
      desc: true,
      id: "Loss",
    },
  ]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handlePageSizeChange: SelectProps["onChange"] = (value) => {
    const parsedPageSize = Number.parseInt(value ?? "", 10);
    if (Number.isNaN(parsedPageSize) === false) {
      table.setPageSize(parsedPageSize)
    }
  };

  const handleFirstPageClick: MouseEventHandler<HTMLButtonElement> = () => {
    table.setPageIndex(0)
  };

  const handleLastPageClick: MouseEventHandler<HTMLButtonElement> = () => {
    table.setPageIndex(table.getPageCount() - 1)
  };

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
          <ActionIcon variant="default" title="Show first" onClick={handleFirstPageClick}>
            <IconChevronsLeft />
          </ActionIcon>
          <ActionIcon
            variant="default"
            title="Show previous"
            onClick={table.getCanPreviousPage() === true ? table.previousPage : undefined}
          >
            <IconChevronLeft />
          </ActionIcon>
          <ActionIcon
            variant="default"
            title="Show next"
            onClick={table.getCanNextPage() === true ? table.nextPage : undefined}
          >
            <IconChevronRight />
          </ActionIcon>
          <ActionIcon variant="default" title="Show last" onClick={handleLastPageClick}>
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
          onChange={handlePageSizeChange}
        />
      </Group>
    </Stack>
  );
}
