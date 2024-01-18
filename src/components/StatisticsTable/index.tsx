import {
  ActionIcon,
  Box,
  Group,
  Pagination,
  Select,
  Skeleton,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { getSortingIcon, globalFilter } from "../utils";
import type { UIDDetails } from "../../utils";
import type { PaginationProps, SelectProps, TextInputProps } from "@mantine/core";
import type { PaginationState, SortingState } from "@tanstack/react-table";

export function StatisticsTable({
  data,
  loading,
}: {
  data: UIDDetails[];
  loading?: boolean;
}): JSX.Element {
  const [filter, setFilter] = useState("");

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<UIDDetails>();
    return [
      columnHelper.accessor((row) => row.uid, {
        cell: (info) => info.getValue(),
        id: "UID",
      }),
      columnHelper.accessor((row) => row.block, {
        cell: (info) => info.getValue(),
        id: "Block",
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
    state: { sorting, pagination: { pageIndex, pageSize }, globalFilter: filter },
    globalFilterFn: globalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFilter,
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

  const handleFilterInput: TextInputProps["onChange"] = (event) => {
    setFilter(event.target.value);
  };

  const paginatedRowStartIndex =
    table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
  const paginatedRowEndIndex = paginatedRowStartIndex + table.getRowModel().rows.length - 1;

  return (
    <Skeleton visible={loading ?? false}>
      <TextInput type="search" value={filter} onChange={handleFilterInput} label="Search entries" />
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
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: "pointer" }}
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
        <Group justify="space-between">
          <Text>{`Showing ${paginatedRowStartIndex} to ${paginatedRowEndIndex} of ${data.length} entries`}</Text>
          <Group>
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
        </Group>
      </Stack>
    </Skeleton>
  );
}
