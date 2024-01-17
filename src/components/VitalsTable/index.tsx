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
  TextInput,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { fetchSubnetVitals } from "../../api";
import { getSortingIcon, globalFilter } from "../utils";
import type { Vitals } from "../../api";
import type { SelectProps, PaginationProps, TextInputProps } from "@mantine/core";
import type { PaginationState, SortingState } from "@tanstack/react-table";

export function VitalsTable(): JSX.Element {
  const { data: vitals, isLoading } = useQuery({
    queryKey: ["vitals"],
    queryFn: fetchSubnetVitals,
    refetchInterval: 10 * 60 * 1000,
  });
  const [filter, setFilter] = useState("");

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      desc: true,
      id: "Emission",
    },
  ]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Vitals>();
    return [
      columnHelper.accessor((row) => row.netUID, {
        cell: (info) => info.getValue(),
        id: "NetUID",
      }),
      columnHelper.accessor((row) => row.label, {
        cell: (info) => info.getValue(),
        id: "Subnet",
      }),
      columnHelper.accessor((row) => row.emission, {
        cell: (info) =>
          info.getValue().toLocaleString(undefined, {
            style: "percent",
            maximumFractionDigits: 4,
            minimumFractionDigits: 4,
          }),
        id: "Emission",
      }),
      columnHelper.accessor((row) => row.emission, {
        cell: (info) =>
          (info.getValue() * 7200).toLocaleString(undefined, {
            maximumFractionDigits: 4,
            minimumFractionDigits: 4,
          }),
        id: "τ/day",
      }),
    ];
  }, []);

  const table = useReactTable({
    state: { sorting, pagination: { pageIndex, pageSize }, globalFilter: filter },
    data: vitals ?? [],
    columns,
    globalFilterFn: globalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    <Skeleton visible={isLoading}>
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
        <Group justify="space-between">
          <Text>{`Showing ${paginatedRowStartIndex} to ${paginatedRowEndIndex} of ${vitals?.length} entries`}</Text>
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
