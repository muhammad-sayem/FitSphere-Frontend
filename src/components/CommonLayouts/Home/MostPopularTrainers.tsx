"use client";

import { trainerServices } from "@/services/trainer.services";
import { useQuery } from "@tanstack/react-query";
import TrainerCard from "../Trainer/TrainerCard";
import { ITrainerProps } from "../Trainer/AllTrainers";
import Link from "next/link";

const MostPopularTrainers = () => {
  const { data: trainersResponse } = useQuery({
    queryKey: ["trainers-home"],
    queryFn: () => trainerServices.getAllTrainers(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  console.log("Most Popular Trainers data:", trainersResponse);
  const trainers = trainersResponse?.data || [];

  return (
    <div className="mx-auto w-9/10 mb-8 md:mb-16">
      <div className="text-center mb-10 md:mb-14 px-4">
        <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-wide uppercase">
          Most Popular <span className="text-primary-01"> Trainers </span>
        </h2>
        <p className="text-lg text-secondary-01 mt-2 max-w-lg mx-auto">
          Train with our industry-leading experts dedicated to guiding your fitness journey with personalized programs and proven results.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          trainers.slice(0, 4).map((trainer: ITrainerProps) => {
            return (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
              />
            )
          })
        }
      </div>

      <div className="flex justify-center">
        <Link href="/trainers" className="mt-8 mx-auto block border border-primary-01 text-primary-01 px-6 py-2 rounded-lg font-bold hover:bg-primary-01 hover:text-white transition-colors duration-300">
          View All Trainers
        </Link>
      </div>
    </div>
  );
};

export default MostPopularTrainers;