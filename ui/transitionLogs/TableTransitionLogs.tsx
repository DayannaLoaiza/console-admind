"use client";
import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TransitionLogs } from "@/lib/definitions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import Filter from "@/components/StateFilterColumns";

export default function TableTransitionLogs({
  logs,
}: {
  logs: TransitionLogs[];
}) {
  const columns: ColumnDef<TransitionLogs>[] = useMemo(
    () => [
      {
        id: "orderId",
        accessorKey: "orderId",
        header: "Id Orden",
        cell: (info) => info.getValue(),
        size: 20,
      },
      {
        accessorKey: "previousState",
        header: "Estado anterior",
        cell: (info) => {
          const currentState = info.getValue() as string;
          return <span>{currentState}</span>;
        },
        size: 10,
      },
      {
        accessorKey: "newState",
        header: "Nuevo Estado",
        cell: (info) => {
          const currentState = info.getValue() as string;
          return <span>{currentState}</span>;
        },
        size: 10,
      },
      {
        accessorKey: "transitionDate",
        header: "Fecha",
        cell: (info) => {
          const date = new Date(info.getValue() as string);
          const formattedDate = date.toLocaleDateString();
          return <span>{formattedDate}</span>;
        },
        size: 10,
      },
      {
        accessorKey: "actionTaken",
        header: "Accion",
        cell: (info) => {
          const currentState = info.getValue() as string;
          return <span>{currentState}</span>;
        },
        size: 35,
      },
    ],
    []
  );

  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col gap-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}%` }}
                  >
                    <div
                      className={`flex flex-row items-center gap-1 ${
                        header.id === "select"
                          ? "justify-center"
                          : "justify-between"
                      } `}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
