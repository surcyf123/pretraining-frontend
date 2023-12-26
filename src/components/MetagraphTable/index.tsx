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
} from "@mantine/core";
import { IconClipboardCheck, IconClipboardCopy } from "@tabler/icons-react";
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
import type { SelectProps, PaginationProps } from "@mantine/core";
import type { PaginationState, SortingState } from "@tanstack/react-table";

export interface NeuronDetails {
  uid: number;
  stake: number;
  rank: number;
  incentive: number;
  emission: number;
  consensus: number;
  trust: number;
  validatorTrust: number;
  dividends: number;
  hotkey: string;
  coldkey: string;
  address: string;
  bonds: number[];
  weight: number[];
}

export interface MetagraphTableProps {
  data: NeuronDetails[];
  loading?: boolean;
}

export function MetagraphTable({ data, loading }: MetagraphTableProps): JSX.Element {
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
    const columnHelper = createColumnHelper<NeuronDetails>();
    return [
      columnHelper.accessor((row) => row.uid, {
        cell: (info) => info.getValue(),
        id: "ID",
      }),
      columnHelper.accessor((row) => row.rank, {
        cell: (info) => info.getValue(),
        id: "Rank",
      }),
      columnHelper.accessor((row) => row.incentive, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Incentives",
      }),
      columnHelper.accessor((row) => row.emission, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Emission",
      }),
      columnHelper.accessor((row) => row.consensus, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Consensus",
      }),
      columnHelper.accessor((row) => row.trust, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Trust",
      }),
      columnHelper.accessor((row) => row.validatorTrust, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Validator Trust",
      }),
      columnHelper.accessor((row) => row.dividends, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Dividends",
      }),
      columnHelper.accessor((row) => row.address, {
        cell: (info) => info.getValue().replace("/ipv0/", ""),
        id: "Address",
      }),
      columnHelper.accessor((row) => row.stake, {
        cell: (info) => info.getValue().toFixed(4),
        id: "Stake",
      }),
      columnHelper.accessor((row) => row.emission, {
        cell: (info) => ((info.getValue() * 72) / 1000000000).toFixed(3),
        id: "Daily Rewards",
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
              >
                {`${info.getValue().slice(0, 6)}...`}
              </Button>
            )}
          </CopyButton>
        ),
        id: "Coldkey",
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
