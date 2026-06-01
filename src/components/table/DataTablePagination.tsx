/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PaginationState, Table as TanstackTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useEffect, useState } from "react";

type PaginationToken = number | "start-ellipsis" | "end-ellipsis";

const DEFAULT_PAGE_SIZES = [1, 10, 20, 50, 100] as const;

const isDefaultPageSize = (value: number) => {
  return DEFAULT_PAGE_SIZES.includes(value as (typeof DEFAULT_PAGE_SIZES)[number]);
};

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): PaginationToken[] => {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 5) {
    return [1, 2, 3, 4, 5, "end-ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 4) {
    return [
      1,
      "start-ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "start-ellipsis",
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    "end-ellipsis",
    totalPages,
  ];
};

interface DataTablePaginationProps<TData> {
  table: TanstackTable<TData>;
  totalRows?: number;
  totalPages?: number;
  isLoading?: boolean;
  onPaginationChange?: (state: PaginationState) => void;
}

const DataTablePagination = <TData,>({
  table,
  totalRows,
  totalPages,
  isLoading,
  onPaginationChange,
}: DataTablePaginationProps<TData>) => {
  const pagination = table.getState().pagination;
  const pageSize = pagination.pageSize;
  const currentPage = pagination.pageIndex + 1;
  const computedTotalPages = totalPages ?? table.getPageCount();

  const [customPageSize, setCustomPageSize] = useState<string>(String(pageSize));
  const [selectMode, setSelectMode] = useState<string>(isDefaultPageSize(pageSize) ? String(pageSize) : "custom");

  useEffect(() => {
    setCustomPageSize(String(pageSize));
    setSelectMode(isDefaultPageSize(pageSize) ? String(pageSize) : "custom");
  }, [pageSize]);

  const paginationItems = useMemo(
    () => getPaginationItems(currentPage, computedTotalPages),
    [currentPage, computedTotalPages],
  );

  const updatePagination = (nextPagination: PaginationState) => {
    if (onPaginationChange) {
      onPaginationChange(nextPagination);
      return;
    }

    table.setPagination(nextPagination);
  };

  const applyCustomPageSize = () => {
    const parsed = Number(customPageSize);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      return;
    }

    updatePagination({
      pageIndex: 0,
      pageSize: parsed,
    });
  };

  const onPageSizeSelect = (value: string) => {
    setSelectMode(value);
    if (value === "custom") {
      return;
    }

    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      return;
    }

    updatePagination({
      pageIndex: 0,
      pageSize: parsed,
    });
  };

  const jumpBackwardTarget = Math.max(1, currentPage - 5);
  const jumpForwardTarget = Math.min(computedTotalPages, currentPage + 5);

  if (computedTotalPages <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 border-t px-4 py-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updatePagination({ pageIndex: Math.max(0, pagination.pageIndex - 1), pageSize })}
          disabled={!table.getCanPreviousPage() || isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>

        {paginationItems.map((item, index) => {
          if (item === "start-ellipsis") {
            return (
              <Button
                key={`start-ellipsis-${index}`}
                variant="ghost"
                size="sm"
                className="min-w-9 px-2"
                onClick={() => updatePagination({ pageIndex: jumpBackwardTarget - 1, pageSize })}
                disabled={isLoading}
              >
                ...
              </Button>
            );
          }

          if (item === "end-ellipsis") {
            return (
              <Button
                key={`end-ellipsis-${index}`}
                variant="ghost"
                size="sm"
                className="min-w-9 px-2"
                onClick={() => updatePagination({ pageIndex: jumpForwardTarget - 1, pageSize })}
                disabled={isLoading}
              >
                ...
              </Button>
            );
          }

          const isActive = item === currentPage;
          return (
            <Button
              key={`page-${item}`}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={cn("min-w-9", isActive && "pointer-events-none")}
              onClick={() => updatePagination({ pageIndex: item - 1, pageSize })}
              disabled={isLoading}
            >
              {item}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => updatePagination({ pageIndex: Math.min(computedTotalPages - 1, pagination.pageIndex + 1), pageSize })}
          disabled={!table.getCanNextPage() || isLoading}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Select value={selectMode} onValueChange={onPageSizeSelect}>
          <SelectTrigger className="w-24 text-black" aria-label="Rows per page">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>

          <SelectContent>
            {DEFAULT_PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-black">rows</span>

        {selectMode === "custom" && (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={1}
              className="h-9 w-24 text-black"
              value={customPageSize}
              onChange={(event) => setCustomPageSize(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyCustomPageSize();
                }
              }}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={applyCustomPageSize}
              disabled={isLoading}
              className="text-black border border-black"
            >
              Apply
            </Button>
          </div>
        )}

        <span className="ml-2 text-black">
          Total {totalRows ?? 0} items, {computedTotalPages} pages
        </span>
      </div>
    </div>
  );
};

export default DataTablePagination;