import { Column } from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { RowData } from "@tanstack/react-table";
import Input from "./Input";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Button } from "./Button";
import { FilterCheck } from "./svg/FilterCheck";
import { FilterSearch } from "./svg/FilterSearch";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

export default function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === "range"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
    [column, filterVariant]
  );

  const filteredOptions = (value: string | undefined) => {
    column.setFilterValue(value || undefined);
  };

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-24 rounded border shadow"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-24 rounded border shadow"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <div className="relative flex items-center justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-7 w-7 items-center p-0 focus:scale-100"
          >
            <FilterCheck
              width={14}
              height={14}
              className="text-gray-900 hover:text-blue-400"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-40">
          <DropdownMenuItem
            key={"todos"}
            onClick={() => filteredOptions("")}
            className={`${!columnFilterValue ? "text-blue-400" : ""}`}
          >
            Todos
          </DropdownMenuItem>
          {sortedUniqueValues.map((option) => (
            <DropdownMenuItem
              key={String(option)}
              onClick={() => filteredOptions(String(option))}
              className={`${
                columnFilterValue === String(option) ? "text-blue-400" : ""
              }`}
            >
              {capitalizeFirstLetter(String(option))}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <>
      {/* <datalist id={column.id + "list"}>
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist> */}
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Buscar... (${column.getFacetedUniqueValues().size})`}
        className="w-36 rounded border shadow"
        /* list={column.id + "list"} */
      />
    </>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <div className="relative flex items-center justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-7 w-7 items-center p-0 focus:scale-100 text-gray-900 hover:bg-gray-200 hover:text-blue-400"
          >
            <FilterSearch
              width={14}
              height={14}
              className="hover:text-blue-400"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          align="start"
          className="z-50 rounded-2xl border-gray-100 p-1"
        >
          <Input
            {...props}
            value={value}
            className="rounded-full"
            onChange={(e) => setValue(e.target.value)}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
