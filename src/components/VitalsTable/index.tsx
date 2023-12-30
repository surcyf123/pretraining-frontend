import { Table, Stack, Group, Text, Skeleton, Box } from "@mantine/core";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import type { Vitals } from "./utils";

export interface VitalsTableProps {
  data: Vitals[];
  loading?: boolean;
}

export function VitalsTable({ data, loading }: VitalsTableProps): JSX.Element {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Vitals>();
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
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
                    <Table.Th key={header.id} style={{ cursor: "pointer" }}>
                      <Group wrap="nowrap">
                        <Text>
                          {header.isPlaceholder === true
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </Text>
                        {/* TODO : handle sorting */}
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
      </Stack>
    </Skeleton>
  );
}
