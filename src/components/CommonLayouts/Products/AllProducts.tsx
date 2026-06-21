/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { productServices } from "@/services/product.services";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

enum ProductCategories {
  TRADEMILL = "TRADEMILL",
  MASSAGER = "MASSAGER",
  DUMMBBELL = "DUMMBBELL",
  BENCHES = "BENCHES",
  FLOOR_MAT = "FLOOR_MAT",
  EXERCISE_BIKE = "EXERCISE_BIKE",
  OTHER = "OTHER",
}

export interface IProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategories;
  remainingStock: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const AllProducts = ({ loggedInUser }: { loggedInUser: any }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "priceDesc" | "priceAsc" | "stockDesc" | "stockAsc">("name");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const buildQueryParams = () => {
    const params: Record<string, any> = {};

    if (debouncedSearchTerm) {
      params.searchTerm = debouncedSearchTerm;
    }

    if (selectedCategory) {
      params.category = selectedCategory;
    }

    if (minPrice) {
      params["price[gte]"] = minPrice;
    }

    if (maxPrice) {
      params["price[lte]"] = maxPrice;
    }

    if (sortBy === "name") {
      params.sortBy = "name";
      params.sortOrder = "asc";
    } else if (sortBy === "priceDesc") {
      params.sortBy = "price";
      params.sortOrder = "desc";
    } else if (sortBy === "priceAsc") {
      params.sortBy = "price";
      params.sortOrder = "asc";
    } else if (sortBy === "stockDesc") {
      params.sortBy = "remainingStock";
      params.sortOrder = "desc";
    } else if (sortBy === "stockAsc") {
      params.sortBy = "remainingStock";
      params.sortOrder = "asc";
    }

    return params;
  };

  const queryParams = buildQueryParams();

  const { data: productsResponse, isLoading } = useQuery({
    queryKey: ["all-products", queryParams],
    queryFn: () => productServices.getAllProducts({ params: queryParams }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const products: IProductProps[] = productsResponse?.data || [];

  const handleClearFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setSortBy("name");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
  };

  const isFiltered = searchTerm || selectedCategory || minPrice || maxPrice || sortBy !== "name";

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>

      <div className="bg-slate-50 border border-primary-01 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          <div className="relative lg:col-span-1">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs text-slate-800 transition-all"
            />
            <div className="absolute left-3 top-2.5 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </div>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs text-slate-700 transition-all"
            >
              <option value="name">Sort by: Alphabetical</option>
              <option value="priceDesc">Sort by: Price (High-Low)</option>
              <option value="priceAsc">Sort by: Price (Low-High)</option>
              <option value="stockDesc">Sort by: Stock (High-Low)</option>
              <option value="stockAsc">Sort by: Stock (Low-High)</option>
            </select>
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs text-slate-700 transition-all"
            >
              <option value="">All Categories</option>
              {Object.values(ProductCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 px-2 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs transition-all"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 px-2 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs transition-all"
            />
          </div>

          <div className="w-full">
            {isFiltered && (
              <button
                onClick={handleClearFilters}
                className="w-full py-1.5 px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-75">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-800"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 bg-white border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-400 text-xs">No products match your matching filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product: IProductProps) => (
            <ProductCard
              key={product.id}
              product={product}
              loggedInUser={loggedInUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;