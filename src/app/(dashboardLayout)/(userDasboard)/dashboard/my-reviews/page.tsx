import MyReviews from "@/components/DashboardLayouts/User/myReviews/MyReviews";
import { reviewServices } from "@/services/review.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

const MyReviewsPage = async() => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  
  const queryClient = new QueryClient(); 

  await queryClient.prefetchQuery({
    queryKey: ["my-reviews"],
    queryFn: () => reviewServices.getMyReviews({
      headers: {
        Cookie: cookieHeader,
      },
    }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyReviews />
      </HydrationBoundary>
    </div>
  );
};

export default MyReviewsPage;
