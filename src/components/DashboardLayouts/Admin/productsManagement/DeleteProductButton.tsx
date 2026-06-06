"use client";

import { IProduct } from "./ProductsManagement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productServices } from "@/services/product.services";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";

const DeleteProductButton = ({ product }: { product: IProduct }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteProductQuery } = useMutation({
    mutationFn: (productId: string) => productServices.deleteProduct(productId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products-management"] });

      Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted Successfully.",
        icon: "success"
      });
    },

    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while deleting product.",
        icon: "error"
      });
    }
  });
  
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductQuery(product.id);
      }
    });
  };

  return (
    <div>
      <button onClick={handleDelete} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors duration-200">
        <Trash2 className="w-3.5 h-3.5" />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default DeleteProductButton;