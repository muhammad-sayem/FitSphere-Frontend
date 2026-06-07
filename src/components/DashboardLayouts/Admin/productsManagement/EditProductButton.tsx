"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { IProduct } from "./ProductsManagement";
import EditProductModal from "./EditProductModal";

interface EditProductButtonProps {
  product: IProduct;
  refetch: () => void;
}

const EditProductButton = ({ product, refetch }: EditProductButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary-01 bg-primary-02/40 hover:bg-primary-02/60 rounded-xl transition-colors duration-200"
      >
        <Edit className="w-3.5 h-3.5" />
        <span>Edit</span>
      </button>

      {isOpen && (
        <EditProductModal
          product={product}
          refetch={refetch}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default EditProductButton;