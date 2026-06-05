/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { reviewServices } from "@/services/review.services";
import { useQuery } from "@tanstack/react-query";
import MyReceivedReviewCard from "./MyReceivedReviewCard";

interface ReviewUser {
  name: string;
  email: string;
  image: string | null;
}

export interface IRecievedReviewData {
  id: string;
  userId: string;
  trainerId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
}

const MyReceivedReviews = ({ trainerId }: { trainerId: string }) => {
  const { data: myReceivedReviewsResponse } = useQuery({
    queryKey: ["my-received-reviews-trainer", trainerId],
    queryFn: () => reviewServices.getReviewsForTrainer(trainerId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const myReceivedReviews = myReceivedReviewsResponse?.data;

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b  border-secondary-01/20 pb-4 mb-8">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          My Received Reviews
        </h2>
        <p className="text-primary-01 border border-primary-01 text-md mt-1 sm:mt-0  px-3 py-1 rounded-full w-max font-semibold">
          {myReceivedReviews?.length || 0} Reviews Found
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {myReceivedReviews?.map((review: IRecievedReviewData) => {
          return (
            <MyReceivedReviewCard
              key={review.id}
              review={review}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyReceivedReviews;