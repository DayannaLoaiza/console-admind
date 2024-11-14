"use client";
import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { OrderInfo } from "@/lib/definitions";
import { Button } from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { VerticalDots } from "@/components/svg/VerticalDots";
import { Edit } from "@/components/svg/Edit";
import UpdateOrder from "./UpdateOrder";

export default function TableOrder({ orders }: { orders: OrderInfo[] }) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectOrder, setSelectOrder] = useState<OrderInfo>();

  const handleOpenModal = (payment: OrderInfo) => {
    setSelectOrder(payment);
    setOpen(true);
  };

  const columns: ColumnDef<OrderInfo>[] = useMemo(
    () => [
      {
        accessorKey: "currentState",
        header: "Estado",
        cell: (info) => {
          const currentState = info.getValue() as string;
          return <span>{currentState}</span>;
        },
        size: 20,
      },
      {
        accessorKey: "amount",
        header: "Total",
        cell: (info) => {
          const currentState = info.getValue() as string;
          return <span>${currentState}</span>;
        },
        size: 10,
      },
      {
        accessorKey: "productDetails",
        header: "# Productos",
        cell: (info) => {
          const currentState = info.getValue() as string;
          return <span>{currentState.length}</span>;
        },
        size: 10,
      },
      {
        accessorKey: "customer.name",
        header: "Cliente",
        cell: (info) => {
          const currentState = info.getValue() as string;
          return <span>{currentState}</span>;
        },
        size: 20,
      },
      {
        accessorKey: "notes",
        header: "Comentario",
        cell: (info) => {
          const currentState = info.getValue() as string;
          return <span>{currentState}</span>;
        },
        size: 35,
      },
      {
        accessorKey: "actions",
        header: "",
        enableHiding: false,
        cell: ({ row }: { row: any }) => {
          const payment = row.original;
          return (
            <div className="relative flex items-center justify-end gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-200"
                  >
                    <VerticalDots className="text-blue-300 hover:text-blue-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{payment.customer.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleOpenModal(payment)}>
                    <Edit width={16} height={16} />
                    Cambiar Estado
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
        size: 5,
      },
    ],
    []
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
      {open && selectOrder && (
        <UpdateOrder order={selectOrder} open={open} setOpen={setOpen} />
      )}
    </div>
  );
}
