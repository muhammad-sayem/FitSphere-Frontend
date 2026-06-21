/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { IProductProps } from "./AllProducts";
import BuyProductButton from "./BuyProductButton";

const ProductCard = ({ product, loggedInUser }: { product: IProductProps; loggedInUser: any }) => {
  const productImage = product?.image && product.image.trim() !== "" ? product.image : "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60";

  return (
    <div 
    data-aos="zoom-in"
    data-aos-duration="1000"
    className="group relative bg-slate-50/60 border border-secondary-03 rounded-xl overflow-hidden hover:bg-white hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between h-105">
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-0" />

      <div className="relative h-56 w-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 z-10 bglinear-to-b from-black/5 to-transparent opacity-40" />
        
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md shadow-sm border border-slate-100 text-primary-01 font-black text-[10px] tracking-wider px-2.5 py-1 rounded-full">
          {product.category}
        </div>

        <Image
          src={productImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover z-0 transform group-hover:scale-105 transition-all duration-700 ease-out p-4"
        />
      </div>

      <div className="px-6 pb-6 flex flex-col grow justify-between relative z-10 pointer-events-none">
        <div className="space-y-2.5 pt-4">
          <div className="flex justify-between items-start gap-3">
            <h3 className="text-base font-bold text-slate-800 tracking-tight line-clamp-2 leading-snug group-hover:text-primary-01 transition-colors duration-300">
              {product.name}
            </h3>
            <span className="text-lg font-black text-primary-01 bg-primary-01/5 px-2.5 py-0.5 rounded-xl whitespace-nowrap">
              ${product.price}
            </span>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-secondary-03 pointer-events-auto">
          <div className="flex flex-col pointer-events-none">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Stock status
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`h-2 w-2 rounded-full ${product.remainingStock >= 5 ? "bg-emerald-500" : product.remainingStock > 0 ? "bg-amber-500" : "bg-rose-500"}`} />
              <span className={`text-xs font-bold ${product.remainingStock >= 5 ? "text-slate-600" : product.remainingStock > 0 ? "text-amber-600" : "text-rose-500"}`}>
                {product.remainingStock >= 5 ? `${product.remainingStock} Available` : product.remainingStock > 0 ? `Only ${product.remainingStock} Left` : "Out of Stock"}
              </span>
            </div>
          </div>
          
          <div onClick={(e) => e.stopPropagation()} className="transform active:scale-95 transition-transform duration-200">
            <BuyProductButton
              key={product.id}
              productId={product.id}
              isDisabled={product.remainingStock === 0}
              loggedInUser={loggedInUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;