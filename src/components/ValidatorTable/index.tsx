import {
  Table,
  Stack,
  Group,
  Pagination,
  Text,
  Select,
  Skeleton,
  ActionIcon,
  CopyButton,
  Button,
  Box,
  Anchor,
} from "@mantine/core";
import { IconClipboardCheck, IconClipboardCopy } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { range } from "d3-array";
import { useMemo, useState } from "react";
import { fetchValidators } from "../../api";
import { getSortingIcon } from "../utils";
import type { Validator } from "../../api";
import type { SelectProps, PaginationProps } from "@mantine/core";
import type { PaginationState, SortingState } from "@tanstack/react-table";

export function ValidatorTable(): JSX.Element {
  const { data: validators, isLoading } = useQuery({
    queryKey: ["validators"],
    queryFn: fetchValidators,
    refetchInterval: 10 * 60 * 1000,
  });

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      desc: true,
      id: "Stake",
    },
  ]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Validator>();
    return [
      columnHelper.accessor((row) => row.uid, {
        cell: (info) => info.getValue(),
        id: "UID",
      }),
      columnHelper.accessor((row) => row.stake, {
        cell: (info) => info.getValue(),
        id: "Stake",
      }),
      columnHelper.accessor((row) => row.name, {
        // eslint-disable-next-line react/no-unstable-nested-components
        cell: (info) => {
          let output = <Text size="sm">{info.getValue()}</Text>;
          if (typeof info.row.original.url === "string") {
            output = (
              <Anchor href={info.row.original.url} target="_blank" size="sm">
                {info.getValue()}
              </Anchor>
            );
          }
          return output;
        },
        id: "Name",
      }),
      columnHelper.accessor((row) => row.hotkey, {
        // eslint-disable-next-line react/no-unstable-nested-components
        cell: (info) => (
          <CopyButton value={info.getValue()}>
            {({ copy, copied }) => (
              <Button
                onClick={copy}
                variant="subtle"
                rightSection={copied === true ? <IconClipboardCheck /> : <IconClipboardCopy />}
                p="0"
              >
                {`${info.getValue().slice(0, 6)}...`}
              </Button>
            )}
          </CopyButton>
        ),
        id: "Hotkey",
      }),
      columnHelper.accessor((row) => row.coldkey, {
        // eslint-disable-next-line react/no-unstable-nested-components
        cell: (info) => (
          <CopyButton value={info.getValue()}>
            {({ copy, copied }) => (
              <Button
                onClick={copy}
                variant="subtle"
                rightSection={copied === true ? <IconClipboardCheck /> : <IconClipboardCopy />}
                p="0"
              >
                {`${info.getValue().slice(0, 6)}...`}
              </Button>
            )}
          </CopyButton>
        ),
        id: "Coldkey",
      }),
      ...range(1, 33).map((ele) => {
        return columnHelper.accessor((row) => row[ele.toString()], {
          cell: (info) => {
            let value = info.getValue();
            if (typeof value === "number") {
              value = value.toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 2,
              });
            }
            return value;
          },
          id: `SN ${ele}`,
        });
      }),
    ];
  }, []);

  const table = useReactTable({
    state: { sorting, pagination: { pageIndex, pageSize } },
    data: validators ?? [],
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

  const paginatedRowStartIndex =
    table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
  const paginatedRowEndIndex = paginatedRowStartIndex + table.getRowModel().rows.length - 1;

  return (
    <Skeleton visible={isLoading}>
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
          <Text>{`Showing ${paginatedRowStartIndex} to ${paginatedRowEndIndex} of ${validators?.length} entries`}</Text>
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
