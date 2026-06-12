"use client";

const BuyProductButton = ({ isDisabled }: { isDisabled: boolean }) => {
  return (
    <div>
      <button
        disabled={isDisabled}
        className="h-9 px-4 bg-primary-01 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded transition-colors duration-300 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
      >
        Buy Now
      </button>
    </div>
  );
};

export default BuyProductButton;