/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreditCard, ShoppingBag } from "lucide-react";
import { orderServices } from "@/services/order.services";

interface BuyProductModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  productId: string;
}

const BuyProductModal = ({ isOpen, setIsOpen, productId }: BuyProductModalProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentUrl, setPaymentUrl] = useState<string>("");
  const [showPaymentStep, setShowPaymentStep] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        productId,
        quantity,
        address,
        phone,
      };

      const result = await orderServices.createOrder(payload as any);

      if (result?.success && result?.data?.paymentUrl) {
        setPaymentUrl(result.data.paymentUrl);
        setShowPaymentStep(true);
        setTotalAmount(result.data.order.totalAmount);
      } 
      else if (result?.data?.data?.paymentUrl) {
        setPaymentUrl(result.data.data.paymentUrl);
        setShowPaymentStep(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentRedirect = () => {
    if (paymentUrl) {
      document.cookie = "payment_initiated=true; path=/; max-age=900; SameSite=Lax" + (window.location.protocol === "https:" ? "; secure" : "");
      window.location.href = paymentUrl;
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShowPaymentStep(false);
      setQuantity(1);
      setAddress("");
      setPhone("");
      setPaymentUrl("");
    }, 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 border border-neutral-100 shadow-xl">
        {!showPaymentStep ? (
          <>
            <DialogHeader className="flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-primary-01">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <DialogTitle className="text-xl font-black text-black tracking-tight">
                Product Details
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 font-medium max-w-xs">
                Please provide your shipping information to complete the order.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-primary-01 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Address
                </label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-primary-01 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-primary-01 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 text-sm font-bold bg-primary-01 text-white rounded-xl hover:bg-black transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Buy"}
              </button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader className="flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <CreditCard className="w-6 h-6" />
              </div>
              <DialogTitle className="text-xl font-black text-black tracking-tight">
                Order Created! <br />
                Your Total Amount is ${totalAmount}
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 font-medium max-w-xs">
                To complete your booking please pay. You will be redirected to our secure gateway.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={handlePaymentRedirect}
                className="w-full py-3 text-sm font-bold bg-primary-01 text-white rounded-xl hover:bg-orange-500 transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm"
              >
                Pay Now
              </button>
              <button
                onClick={handleClose}
                className="w-full py-3 text-sm font-bold bg-white text-neutral-700 border border-primary-01 rounded-xl hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
              >
                Pay Later
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BuyProductModal;