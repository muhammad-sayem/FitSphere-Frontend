"use client";

import { trainerServices } from "@/services/trainer.services";
import { useQuery } from "@tanstack/react-query";

const AllTrainers = () => {
  const { data } = useQuery({
    queryKey: ["trainers"],
    queryFn: trainerServices.getAllTrainers,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const trainers = data.data;

  console.log("Trainers data:", trainers);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Trainers</h1>
      <p> {trainers.length} trainers found. </p>
    </div>
  );
};

export default AllTrainers;