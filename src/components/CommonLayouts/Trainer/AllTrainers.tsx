"use client";

import { trainerServices } from "@/services/trainer.services";
import { useQuery } from "@tanstack/react-query";
import TrainerCard from "./TrainerCard";

export interface ITrainerProps {
  id: string;
  userId: string;
  bio: string;
  specialties: string;
  experience: number;
  feePerHour: number;
  avgRating: number;
  isApproved: boolean;
  createdAt: string;
  user: {
    name: string;
    email: string;
    image: string;
    status: string;
    isDeleted: boolean;
  };
}

const AllTrainers = () => {
  const { data } = useQuery({
    queryKey: ["trainers"],
    queryFn: () => trainerServices.getAllTrainers(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const trainers = data.data;

  console.log("Trainers data:", trainers);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {
        trainers.map((trainer: ITrainerProps) => {
          return (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
            />
          );
        })
      }
    </div>
  );
};

export default AllTrainers;