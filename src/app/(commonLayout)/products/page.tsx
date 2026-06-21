import AllProducts from "@/components/CommonLayouts/Products/AllProducts";
import { productServices } from "@/services/product.services";
import { userServices } from "@/services/user.services";
import { dehydrate, HydrationBoundary, QueryClient, } from "@tanstack/react-query";

const ProductsPage = async() => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-products"],
    queryFn: () => productServices.getAllProducts(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const loggedInUser = await userServices.getLoggedInUser();
  console.log("Logged in user on products page:", loggedInUser);

  return (
    <div className="mx-auto w-9/10 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllProducts
          loggedInUser={loggedInUser}
        />
      </HydrationBoundary>
    </div>
  );
};

export default ProductsPage;