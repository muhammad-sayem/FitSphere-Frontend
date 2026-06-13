"use client";

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

const AllProducts = () => {
  const { data: productsResponse } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => productServices.getAllProducts(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  console.log("Products response:", productsResponse);
  const products = productsResponse?.data;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {
          products.map((product: IProductProps) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          })
        }
      </div>
    </div>
  );
};

export default AllProducts;