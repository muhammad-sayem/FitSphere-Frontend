import ProductsManagement from "@/components/DashboardLayouts/Admin/ProductsManagement";
import { productServices } from "@/services/product.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

const ProductsManagementPage = async () => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const queryClient = new QueryClient();

  const defaultParams = {
    page: "1",
    limit: "10",
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  await queryClient.prefetchQuery({
    queryKey: ["admin-products-management", defaultParams],
    queryFn: () =>
      productServices.getAllProducts({
        params: defaultParams,
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
        <ProductsManagement />
      </HydrationBoundary>
    </div>
  );
};

export default ProductsManagementPage;