/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { bookingServices } from '@/services/booking.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface DeleteMyBookingButtonProps {
  bookingId: string;
  paymentStatus?: string;
  refetch?: () => void;
}

const DeleteMyBookingButton = ({ bookingId, paymentStatus, refetch }: DeleteMyBookingButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await bookingServices.deleteMyBooking(bookingId);
      return response;
    },

    onSuccess: async (response: any) => {
      if (response?.data?.success || response?.success !== false) {
        // Invalidate all queries that start with "my-bookings" to bypass object structure mismatches
        await queryClient.invalidateQueries({
          queryKey: ["my-bookings"],
          exact: false
        });
        
        if (refetch) {
          refetch();
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your booking has been deleted.",
          icon: "success"
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ["my-bookings"], exact: false });
        if (refetch) refetch();
      }
    },

    onError: (error: any) => {
      const errorMessage = error?.message || "Something went wrong.";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    }
  });

  const handleDeleteMyBooking = () => {
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
        mutate();
      }
    });
  };

  const isPaid = paymentStatus === "SUCCEEDED";

  return (
    <div>
      <button
        onClick={handleDeleteMyBooking}
        disabled={isPaid}
        className={`flex justify-center items-center rounded-md h-8 w-2/3 p-0 text-white space-x-1 font-bold ${
          isPaid 
            ? "bg-red-200 cursor-not-allowed" 
            : "bg-red-500 hover:bg-red-900 hover:text-white hover:cursor-pointer"
        }`}
      >
        <Trash2 size={16} />
        <p> Delete </p>
      </button>
    </div>
  );
};

export default DeleteMyBookingButton;