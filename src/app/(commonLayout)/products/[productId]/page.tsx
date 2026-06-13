import Image from "next/image";
import Link from "next/link";
import { productServices } from "@/services/product.services";
import BuyProductButton from "@/components/CommonLayouts/Products/BuyProductButton";

const ProductDetails = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;

  const { data: product } = await productServices.getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-2">Product Not Found</h2>
          <Link href="/products" className="text-primary-01 hover:underline font-medium">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const productImage = product.image && product.image.trim() !== "" ? product.image : "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60";

  return (
    <div className="min-h-screen bg-neutral-50/50 py-12 sm:py-16">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            BACK TO PRODUCTS
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square w-full bg-neutral-50 rounded-2xl border border-neutral-100 p-8 flex items-center justify-center overflow-hidden group">
              <span className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded">
                {product.category}
              </span>

              <Image
                src={productImage}
                alt={product.name}
                width={500}
                height={500}
                priority
                className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between pt-2">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${product.remainingStock >= 5
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : product.remainingStock > 0
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${product.remainingStock >= 5 ? "bg-green-600" : product.remainingStock > 0 ? "bg-amber-600" : "bg-rose-600"
                    }`} />
                  {product.remainingStock >= 5 ? "In Stock" : product.remainingStock > 0 ? "Low Stock" : "Out of Stock"}
                </span>


              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-none mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-neutral-100">
                <span className="text-3xl sm:text-4xl font-black text-primary-01">
                  Price:${product.price}
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">
                  Description
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md p-4 bg-neutral-50 rounded-xl border border-neutral-100 mb-8">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-0.5">
                    Available Stock
                  </span>
                  <span className="text-sm font-bold text-black">
                    {product.remainingStock} Units
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-0.5">
                    Category
                  </span>
                  <span className="text-sm font-bold text-black">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <BuyProductButton
                  key={product.id}
                  productId={product.id}
                  isDisabled={product.remainingStock === 0}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;