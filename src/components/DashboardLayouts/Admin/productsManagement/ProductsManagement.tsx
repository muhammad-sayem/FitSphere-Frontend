/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { productServices } from "@/services/product.services";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Filter, ArrowUpDown, Loader2 } from "lucide-react";
import { PaginationState } from "@tanstack/react-table";
import DeleteProductButton from "./DeleteProductButton";
import EditProductButton from "./EditProductButton";
import CreateProductModal from "./CreateProductModal";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  remainingStock: number;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [customInput, setCustomInput] = useState("10");

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page: String(pagination.pageIndex + 1),
      limit: String(pagination.pageSize),
      sortBy: sortField,
      sortOrder: sortOrder,
    };

    if (searchTerm) params.searchTerm = searchTerm;
    if (categoryFilter) params.category = categoryFilter;

    return params;
  }, [searchTerm, categoryFilter, sortField, sortOrder, pagination]);

  // isFetching property-ti ekhane add kora hoyeche
  const { data: productsResponse, refetch, isFetching } = useQuery({
    queryKey: ["admin-products-management", queryParams],
    queryFn: () =>
      productServices.getAllProducts({
        params: queryParams,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const products = (productsResponse?.data as IProduct[]) || [];
  const meta = productsResponse?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  useEffect(() => {
    if (meta.limit) {
      setCustomInput(String(meta.limit));
    }
  }, [meta.limit]);

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleApplyCustomLimit = () => {
    const val = Number(customInput);
    if (val > 0) {
      setPagination({
        pageIndex: 0,
        pageSize: val,
      });
    }
  };

  const handlePageChange = (newPageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: newPageIndex,
    }));
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">Products Management</h1>
          <p className="text-xs sm:text-sm text-secondary-01/80 font-medium">{meta.total} products found</p>
        </div>

        <div>
          <CreateProductModal refetch={refetch} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto items-center">
          <div className="relative w-full">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-01/60" />
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="w-full pl-9 pr-8 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white transition-colors duration-200 text-black font-medium appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="TRADEMILL">Treadmill</option>
              <option value="MASSAGER">Massager</option>
              <option value="DUMMBBELL">Dumbbell</option>
              <option value="BENCHES">Benches</option>
              <option value="FLOOR_MAT">Floor Mat</option>
              <option value="EXERCISE_BIKE">Exercise Bike</option>
              <option value="OTHER">Other</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-500 w-0 h-0" />
          </div>

          <div className="relative w-full sm:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-01/60" />
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-4 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white transition-colors duration-200 text-black font-medium"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-secondary-01/10 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-secondary-01/10 text-xs text-secondary-01 font-black uppercase tracking-wider">
                <th className="px-4 py-4 w-16">Image</th>
                <th className="px-4 py-4 min-w-30">Name</th>
                <th className="px-4 py-4 max-w-50">Description</th>
                <th className="px-4 py-4 cursor-pointer select-none w-24" onClick={() => handleSort("price")}>
                  <div className="flex items-center gap-1.5">
                    <span>Price</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-secondary-01/60" />
                  </div>
                </th>
                <th className="px-4 py-4 w-32">Category</th>
                <th className="px-4 py-4 cursor-pointer select-none w-40" onClick={() => handleSort("remainingStock")}>
                  <div className="flex items-center gap-1.5">
                    <span>Remaining Stock</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-secondary-01/60" />
                  </div>
                </th>
                <th className="px-4 py-4 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-01/10 text-sm text-neutral-800 font-medium relative">
              {/* Data Loading State */}
              {isFetching ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-primary-01 font-semibold">
                      <Loader2 className="w-8 h-8 animate-spin text-primary-01" />
                      <span>Loading products...</span>
                    </div>
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50/40 transition-colors duration-150">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-primary-02/30 bg-neutral-50 flex items-center justify-center shrink-0">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary-02/40 text-primary-01 flex items-center justify-center text-xs font-black">
                            {getInitials(product.name)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 wrap-break-word text-black font-bold max-w-40">{product.name}</td>
                    <td className="px-4 py-3 max-w-50 truncate text-secondary-01">{product.description || "N/A"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-black font-black">${product.price}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border bg-neutral-50 text-neutral-700 border-neutral-200 uppercase">
                        {product.category === "TRADEMILL" ? "Treadmill" : product.category === "DUMMBBELL" ? "Dumbbell" : product.category?.replace("_", " ") || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                          product.remainingStock >= 5
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {product.remainingStock} left
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <EditProductButton product={product as IProduct} refetch={refetch} />
                        <DeleteProductButton product={product as IProduct} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* No Data State */
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-secondary-01 font-semibold">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-6 py-4 bg-neutral-50/50 border-t border-secondary-01/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(pagination.pageIndex - 1, 0))}
              disabled={meta.page === 1 || meta.totalPages <= 1 || isFetching}
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-secondary-01/20 rounded-xl bg-white hover:bg-neutral-50 text-sm font-medium text-neutral-700 disabled:opacity-50 disabled:hover:bg-white transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            {Array.from({ length: meta.totalPages || 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                disabled={isFetching}
                className={`w-8 h-8 rounded-xl text-sm font-bold border transition-colors duration-200 ${
                  meta.page === index + 1
                    ? "bg-black text-white border-black"
                    : "bg-white text-neutral-700 border-secondary-01/20 hover:bg-neutral-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(pagination.pageIndex + 1, meta.totalPages - 1))}
              disabled={meta.page === meta.totalPages || meta.totalPages <= 1 || isFetching}
              className="inline-flex items-xl gap-1 px-3 py-1.5 border border-secondary-01/20 rounded-xl bg-white hover:bg-neutral-50 text-sm font-medium text-neutral-700 disabled:opacity-50 disabled:hover:bg-white transition-colors duration-200"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <select
                value={pagination.pageSize}
                disabled={isFetching}
                onChange={(e) => {
                  const size = Number(e.target.value);
                  setPagination({ pageIndex: 0, pageSize: size });
                }}
                className="pl-3 pr-8 py-1.5 border border-secondary-01/20 rounded-xl text-sm font-medium bg-white text-black cursor-pointer focus:outline-none disabled:opacity-50"
              >
                <option value={5}>5 rows</option>
                <option value={10}>10 rows</option>
                <option value={20}>20 rows</option>
                <option value={50}>50 rows</option>
              </select>

              <span className="text-sm text-neutral-400 font-medium">or Custom:</span>
              <input
                type="number"
                value={customInput}
                disabled={isFetching}
                onChange={(e) => setCustomInput(e.target.value)}
                min="1"
                className="w-16 px-2 py-1 border border-secondary-01/20 rounded-xl text-sm font-medium text-center focus:outline-none focus:border-primary-01/40 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleApplyCustomLimit}
                disabled={isFetching}
                className="px-3 py-1.5 border border-black rounded-xl bg-white hover:bg-neutral-50 text-sm font-bold text-black transition-colors duration-200 disabled:opacity-50"
              >
                Apply
              </button>
            </div>

            <span className="text-sm text-neutral-600 font-semibold whitespace-nowrap">
              Total {meta.total} items, {meta.totalPages || 1} pages
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;