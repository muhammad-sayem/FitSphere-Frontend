"use client";

import { reviewServices } from "@/services/review.services";
import { useQuery } from "@tanstack/react-query";

const MyReceivedReviews = ({ trainerId }: { trainerId: string }) => {

  const { data: myReceivedReviewsResponse } = useQuery({
    queryKey: ["my-received-reviews-trainer"],
    queryFn: () => reviewServices.getReviewsForTrainer(trainerId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const myReceivedReviews = myReceivedReviewsResponse?.data;
  console.log("[MyReceivedReviews] myReceivedReviews:", myReceivedReviews);

  return (
    <div>
      <h1>My Received Reviews</h1>
      <p> {myReceivedReviews?.length} reviews found </p>
    </div>
  );
};

export default MyReceivedReviews;