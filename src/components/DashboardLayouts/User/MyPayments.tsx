"use client";

import { paymentServices } from "@/services/payment.services";
import { useQuery } from "@tanstack/react-query";

const MyPayments = () => {
  const { data: myPaymentsResponse } = useQuery({
    queryKey: ["my-payments"],
    queryFn: paymentServices.getMyPayments,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const myPayments = myPaymentsResponse?.data;

  return (
    <div>
      <h1>My Payments Page</h1>
      <p> {myPayments?.length} payments found </p>
    </div>
  );
};

export default MyPayments;