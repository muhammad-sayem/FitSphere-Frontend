/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import DataTable from "@/components/table/DataTable";
import { DataTableFilterConfig, DataTableFilterValues, DataTableFilterValue } from "@/components/table/DataTableFilters";
import { orderServices } from "@/services/order.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";
import { useState, useEffect, useMemo } from "react";

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

type MyOrder = {
  id: string;
  phone: string;
  quantity: number;
  price: number;
  totalAmount: number;
  status: OrderStatus;
  product?: {
    name?: string;
  };
};

const getStatusStyles = (status: OrderStatus) => {
  switch (status) {
    case "PAID":
      return "bg-blue-50 text-blue-600 border-blue-500";
    case "DELIVERED":
      return "bg-green-50 text-green-600 border-green-200";
    case "CANCELLED":
      return "bg-red-50 text-red-600 border-red-200";
    case "SHIPPED":
      return "bg-purple-50 text-purple-600 border-purple-200";
    case "PENDING":
      return "bg-primary-02/20 text-primary-01 border-primary-01";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const columns: ColumnDef<MyOrder>[] = [
  {
    accessorKey: "product.name",
    header: "Product",
    enableSorting: true,
    cell: ({ row }) => <div className="text-center">{row.original.product?.name ?? "-"}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    enableSorting: true,
    cell: ({ row }) => <div className="text-center">{row.original.phone}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    enableSorting: true,
    cell: ({ row }) => <div className="text-center">{row.original.quantity}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    enableSorting: true,
    cell: ({ row }) => <div className="text-center">{row.original.price}</div>,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    enableSorting: true,
    cell: ({ row }) => <div className="text-center">{row.original.totalAmount}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const currentStatus = row.original.status;
      return (
        <div className="flex justify-center items-center w-full">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border capitalize tracking-wide ${getStatusStyles(
              currentStatus
            )}`}
          >
            {currentStatus?.toLowerCase()}
          </span>
        </div>
      );
    },
  },
];

const filterConfigs: DataTableFilterConfig[] = [
  {
    id: "status",
    label: "Status",
    type: "single-select",
    options: [
      { label: "Pending", value: "PENDING" },
      { label: "Paid", value: "PAID" },
      { label: "Shipped", value: "SHIPPED" },
      { label: "Delivered", value: "DELIVERED" },
    ],
  },
  {
    id: "totalAmount",
    label: "Total Amount Range",
    type: "range",
  },
  {
    id: "quantity",
    label: "Quantity Range",
    type: "range",
  },
];

const MyOrders = () => {
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<DataTableFilterValues>({});

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    };

    if (sorting.length > 0) {
      params.sortBy = sorting[0].id;
      params.sortOrder = sorting[0].desc ? "desc" : "asc";
    }

    if (searchTerm) {
      params.searchTerm = searchTerm;
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      if (typeof value === "object" && !Array.isArray(value)) {
        if (value.gte) params[`${key}[gte]`] = value.gte;
        if (value.lte) params[`${key}[lte]`] = value.lte;
      } else {
        params[key] = value;
      }
    });

    return params;
  }, [pagination.pageIndex, pagination.pageSize, sorting, searchTerm, filters]);

  const { data: myOrdersResponse, isPending, isFetching } = useQuery({
    queryKey: ["my-orders", queryParams],
    queryFn: () => orderServices.getMyOrders({ params: queryParams }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000,
  });

  const [lastValidData, setLastValidData] = useState<{
    data: MyOrder[];
    meta: any;
  } | null>(null);

  useEffect(() => {
    if (myOrdersResponse?.data) {
      setLastValidData({
        data: myOrdersResponse.data.data ?? [],
        meta: myOrdersResponse.data.meta ?? { page: 1, limit: pagination.pageSize, total: 0, totalPages: 1 },
      });
    }
  }, [myOrdersResponse, pagination.pageSize]);

  const myOrders = myOrdersResponse?.data?.data ?? lastValidData?.data ?? [];
  const meta = myOrdersResponse?.data?.meta ?? lastValidData?.meta ?? { page: 1, limit: pagination.pageSize, total: 0, totalPages: 1 };

  const handleFilterChange = (filterId: string, value: DataTableFilterValue | undefined) => {
    setFilters((prev) => ({ ...prev, [filterId]: value }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleClearAllFilters = () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          {meta?.total ?? 0} orders found
        </p>
      </div>

      <DataTable
        data={myOrders}
        columns={columns}
        emptyMessage="No orders available."
        isLoading={isPending || isFetching}
        meta={meta}
        sorting={{
          state: sorting,
          onSortingChange: (nextSort) => setSorting(nextSort),
        }}
        pagination={{
          state: pagination,
          onPaginationChange: (nextPage) => setPagination(nextPage),
        }}
        search={{
          initialValue: searchTerm,
          placeholder: "Search product name, description or address...",
          onDebouncedChange: handleSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filters,
          onFilterChange: handleFilterChange,
          onClearAll: handleClearAllFilters,
        }}
      />
    </div>
  );
};

export default MyOrders;