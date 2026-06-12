import { productServices } from "@/services/product.services";

const ProductDetails = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  console.log("Fetching details for product ID:", productId);

  const { data } = await productServices.getProductById(productId);
  console.log("Product details:", data);

  return (
    <div className="w-9/10 mx-auto py-10">
      product details page {productId}
    </div>
  );
};

export default ProductDetails;