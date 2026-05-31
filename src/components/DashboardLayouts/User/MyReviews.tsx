"use client";

import { reviewServices } from "@/services/review.services";
import { useQuery } from "@tanstack/react-query";

const MyReviews = () => {
  const {data: myReviewsResponse} = useQuery({
    queryKey: ["my-reviews"],
    queryFn: () => reviewServices.getMyReviews(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const myReviews = myReviewsResponse?.data;
  console.log("[MyReviews] myReviews:", myReviews);

  return (
    <div>
      <h1>My Reviews Page</h1>
      <p> {myReviews?.length} reviews found </p>
    </div>
  );
};

export default MyReviews;