"use client";

import { reviewServices } from "@/services/review.services";
import { useQuery } from "@tanstack/react-query";
import MyReviewCard from "./MyReviewCard";

export interface IUser {
  name: string;
  email: string;
  image: string;
}

export interface ITrainer {
  id: string;
  userId: string;
  bio: string;
  specialties: string;
  experience: number;
  feePerHour: number;
  avgRating: number;
  isApproved: boolean;
  createdAt: string; 
  user: IUser;
}

export interface IMyReviewCardProps {
  id: string;
  userId: string;
  trainerId: string;
  rating: number;
  comment: string;
  createdAt: string; 
  updatedAt: string; 
  trainer: ITrainer;
}

const MyReviews = () => {
  const { data: myReviewsResponse } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: () => reviewServices.getMyReviews(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const myReviews = myReviewsResponse?.data;

  return (
    <div className="bg-neutral-50 text-black min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b  border-secondary-01/20 pb-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            My Reviews Page
          </h2>
          <p className="text-primary-01 border border-primary-01 text-md mt-1 sm:mt-0  px-3 py-1 rounded-full w-max font-semibold">
            {myReviews?.length || 0} Reviews Found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myReviews?.map((review: IMyReviewCardProps) => (
            <MyReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReviews;