import Image from "next/image";
import Link from "next/link";
import { IAllProductsProps } from "./AllProducts";
import BuyProductButton from "./BuyProductButton";

const ProductCard = ({ product }: { product: IAllProductsProps }) => {
  const productImage = product?.image && product.image.trim() !== "" ? product.image : "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative bg-white border border-neutral-200 rounded-xl overflow-hidden hover:cursor-pointer hover:border-primary-01 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-95">
      <div className="relative h-45 w-full bg-neutral-50 p-4 flex items-center justify-center overflow-hidden">
        <div className="absolute top-3 left-3 z-10 bg-primary-01 text-white text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-sm">
          {product.category}
        </div>

        <Image
          src={productImage}
          alt={product.name}
          width={180}
          height={180}
          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <div className="absolute bottom-0 left-0 w-full h-px bg-primary-01 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>

      <div className="p-4 flex flex-col grow justify-between bg-white">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary-01 transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
            <span className="text-base font-black whitespace-nowrap">
              ${product.price}
            </span>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-dashed border-neutral-200">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider">
              Stock status
            </span>
            <span className={`text-[14px] font-bold ${product.remainingStock >= 5 ? "text-green-600" : "text-rose-600"}`}>
              {product.remainingStock >= 5 ? `${product.remainingStock} Available` : product.remainingStock > 0 ? `Only ${product.remainingStock} Left` : "Out of Stock"}
            </span>
          </div>

          <BuyProductButton
            isDisabled={product.remainingStock === 0}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;