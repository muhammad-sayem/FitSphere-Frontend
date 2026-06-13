"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";

interface BookSessionModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  paymentUrl: string;
}

const BookSessionModal = ({ isOpen, setIsOpen, paymentUrl }: BookSessionModalProps) => {
  const handlePaymentRedirect = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 border border-neutral-100 shadow-xl">
        <DialogHeader className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <DialogTitle className="text-xl font-black text-black tracking-tight">
            Booking Confirmed!
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
            onClick={() => setIsOpen(false)}
            className="w-full py-3 text-sm font-bold bg-white text-neutral-700 border border-primary-01 rounded-xl hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
          >
            Pay Later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookSessionModal;