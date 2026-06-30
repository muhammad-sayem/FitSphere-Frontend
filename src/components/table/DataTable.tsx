/* eslint-disable react-hooks/incompatible-library */
"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import DataTableFilters, {
  DataTableFilterConfig,
  DataTableFilterValue,
  DataTableFilterValues,
} from "./DataTableFilters";
import DataTablePagination from "./DataTablePagination";
import DataTableSearch from "./DataTableSearch";
import { PaginationMeta } from "@/types/api.types";

interface DataTableActions<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: DataTableActions<TData>;
  toolbarAction?: React.ReactNode;
  emptyMessage?: string;
  isLoading?: boolean;
  sorting?: {
    state: SortingState;
    onSortingChange?: (state: SortingState) => void;
  };
  pagination?: {
    state: PaginationState;
    onPaginationChange: (state: PaginationState) => void;
  };
  search?: {
    initialValue?: string;
    placeholder?: string;
    debounceMs?: number;
    onDebouncedChange: (value: string) => void;
  };
  filters?: {
    configs: DataTableFilterConfig[];
    values: DataTableFilterValues;
    onFilterChange: (filterId: string, value: DataTableFilterValue | undefined) => void;
    onClearAll?: () => void;
  };
  meta?: PaginationMeta;
}

const DataTable = <TData,>({
  data = [],
  columns,
  actions,
  toolbarAction,
  emptyMessage,
  isLoading,
  sorting,
  pagination,
  search,
  filters,
  meta,
}: DataTableProps<TData>) => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const showLoadingOverlay = Boolean(isLoading) && hasHydrated;

  const tableColumns = useMemo<ColumnDef<TData>[]>(() => {
    if (!actions) return columns;

    return [
      ...columns,
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const rowData = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="h-8 w-8 p-0">
                  <span className="sr-only">Open Menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {actions.onView && (
                  <DropdownMenuItem onClick={() => actions.onView?.(rowData)}>
                    View
                  </DropdownMenuItem>
                )}

                {actions.onEdit && (
                  <DropdownMenuItem onClick={() => actions.onEdit?.(rowData)}>
                    Edit
                  </DropdownMenuItem>
                )}

                {actions.onDelete && (
                  <DropdownMenuItem onClick={() => actions.onDelete?.(rowData)}>
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  }, [columns, actions]);

  const internalPaginationState = useMemo(() => {
    if (!pagination) return undefined;
    return {
      pageIndex: pagination.state.pageIndex,
      pageSize: pagination.state.pageSize,
    };
  }, [pagination]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: Boolean(sorting),
    manualPagination: true,
    autoResetPageIndex: false,
    pageCount: meta?.totalPages ? Math.max(meta.totalPages, 1) : 1,
    state: {
      ...(sorting ? { sorting: sorting.state } : {}),
      ...(internalPaginationState ? { pagination: internalPaginationState } : {}),
    },
    onSortingChange: sorting?.onSortingChange 
      ? (updater) => {
          const nextState = typeof updater === "function" ? updater(sorting.state) : updater;
          sorting.onSortingChange?.(nextState);
        }
      : undefined,
    onPaginationChange: pagination?.onPaginationChange
      ? (updater) => {
          if (pagination?.state) {
            const nextState = typeof updater === "function" ? updater(pagination.state) : updater;
            pagination.onPaginationChange(nextState);
          }
        }
      : undefined,
  });

  return (
    <div className="relative">
      {showLoadingOverlay && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-01 border-t-transparent" />
            <span className="text-lg font-bold text-primary-01">Loading...</span>
          </div>
        </div>
      )}

      {(search || filters || toolbarAction) && (
        <div className="mb-4 flex flex-wrap items-start gap-3">
          {search && (
            <DataTableSearch
              key={search.initialValue ?? ""}
              initialValue={search.initialValue}
              placeholder={search.placeholder}
              debounceMs={search.debounceMs}
              onDebouncedChange={search.onDebouncedChange}
              isLoading={isLoading}
            />
          )}

          {filters && (
            <DataTableFilters
              filters={filters.configs}
              values={filters.values}
              onFilterChange={filters.onFilterChange}
              onClearAll={filters.onClearAll}
              isLoading={isLoading}
            />
          )}

          {toolbarAction && <div className="ml-auto shrink-0">{toolbarAction}</div>}
        </div>
      )}

      <div className="rounded-lg border">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-225">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    <div className="flex items-center justify-center w-full">
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <Button
                          variant={"ghost"}
                          className="h-auto cursor-pointer p-0 font-semibold hover:bg-transparent hover:text-inherit focus-visible:ring-0 flex items-center justify-center mx-auto"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() === "asc" ? (
                            <ArrowUp className="ml-1 h-4 w-4 shrink-0" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDown className="ml-1 h-4 w-4 shrink-0" />
                          ) : (
                            <ArrowUpDown className="ml-1 h-4 w-4 opacity-50 shrink-0" />
                          )}
                        </Button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  {emptyMessage || "No data available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          </Table>
        </div>

        {pagination && (
          <DataTablePagination
            table={table}
            totalPages={meta?.totalPages}
            totalRows={meta?.total}
            isLoading={isLoading}
            onPaginationChange={pagination.onPaginationChange}
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;