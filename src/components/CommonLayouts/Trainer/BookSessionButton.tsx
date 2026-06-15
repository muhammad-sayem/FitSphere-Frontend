"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { bookingServices } from "@/services/booking.services";
import BookSessionModal from "./BookSessionModal";

interface BookSessionButtonProps {
  slot: {
    id: string;
    trainerId: string;
    isBooked: boolean;
  };
}

const BookSessionButton = ({ slot }: BookSessionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBookingInit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to book this session slot?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          const response = await bookingServices.createBooking({
            slotId: slot.id,
            trainerId: slot.trainerId,
          });

          if (response?.data?.paymentUrl) {
            setPaymentUrl(response.data.paymentUrl);
            setIsOpen(true);
          } 
          
          else {
            Swal.fire({
              title: "Error!",
              text: "Payment details could not be generated.",
              icon: "error",
              confirmButtonColor: "#000000",
            });
          }
        } 
        
        catch (error) {
          Swal.fire({
            title: "Booking Failed",
            text: error instanceof Error ? error.message : "Something went wrong",
            icon: "error",
            confirmButtonColor: "#000000",
          });
        } 
        
        finally {
          setIsLoading(false);
        }
      }
    });
  };

  return (
    <>
      <button
        onClick={handleBookingInit}
        disabled={slot.isBooked || isLoading}
        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
          slot.isBooked || isLoading
            ? "bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed"
            : "bg-primary-01 text-white hover:bg-orange-500 active:scale-[0.98] cursor-pointer"
        }`}
      >
        {isLoading ? "Processing..." : "Book Session"}
      </button>

      <BookSessionModal isOpen={isOpen} setIsOpen={setIsOpen} paymentUrl={paymentUrl} />
    </>
  );
};

export default BookSessionButton;