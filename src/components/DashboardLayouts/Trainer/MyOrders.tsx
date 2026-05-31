"use client";

import { orderServices } from "@/services/order.services";
import { useQuery } from "@tanstack/react-query";

const MyOrders = () => {
  const { data: myOrdersResponse } = useQuery({
    queryKey: ["my-orders-trainer"],
    queryFn: () => orderServices.getMyOrders(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const myOrders = myOrdersResponse?.data;
  console.log("[MyOrders (Trainer)] myOrders:", myOrders);

  return (
    <div>
      <h1>My Orders</h1>
      <p> {myOrders?.length} orders found </p>
    </div>
  );
};

export default MyOrders;