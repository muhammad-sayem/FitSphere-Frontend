"use client";

import { useState } from "react";
import BuyProductModal from "./BuyProductModal";

interface BuyProductButtonProps {
  isDisabled: boolean;
  productId: string;
}

const BuyProductButton = ({ isDisabled, productId }: BuyProductButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        disabled={isDisabled}
        onClick={() => setIsOpen(true)}
        className="h-9 px-4 bg-primary-01 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded transition-colors duration-300 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed cursor-pointer"
      >
        Buy Now
      </button>

      <BuyProductModal isOpen={isOpen} setIsOpen={setIsOpen} productId={productId} />
    </div>
  );
};

export default BuyProductButton;