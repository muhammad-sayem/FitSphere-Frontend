/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import BuyProductModal from "./BuyProductModal";

interface BuyProductButtonProps {
  isDisabled: boolean;
  productId: string;
  loggedInUser: any;
}

const BuyProductButton = ({ isDisabled, productId, loggedInUser }: BuyProductButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isButtonDisabled = 
    isDisabled || 
    !loggedInUser || 
    loggedInUser.role === "TRAINER" || 
    loggedInUser.role === "ADMIN";

  return (
    <div>
      <button
        disabled={isButtonDisabled}
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