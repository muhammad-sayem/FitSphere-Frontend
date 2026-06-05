import Image from "next/image";
import { useState } from "react";
import { IRecievedReviewData } from "./MyReceivedReviews";

const MyReceivedReviewCard = ({ review }: { review: IRecievedReviewData }) => {
  const [imageError, setImageError] = useState(false);

  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const showFallback = !review.user.image || imageError;

  return (
    <div className="group relative bg-white border border-secondary-01/20 rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-primary-01/40 shadow-sm hover:shadow-md overflow-hidden w-full">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-01 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="relative shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-primary-02/30 bg-neutral-50 flex items-center justify-center">
                {showFallback ? (
                  <div className="w-full h-full bg-primary-02/40 text-primary-01 flex items-center justify-center text-sm sm:text-base font-black">
                    {getInitials(review.user.name)}
                  </div>
                ) : (
                  <Image
                    src={review.user.image!}
                    alt={review.user.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 flex items-center gap-0.5 bg-primary-01 text-white px-1 sm:px-1.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-black shadow-sm">
                <span>★</span>
                <span>{review.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="text-black font-black text-sm sm:text-base tracking-tight group-hover:text-primary-01 transition-colors duration-200 truncate">
                {review.user.name}
              </h3>
              <span className="inline-block bg-primary-02 text-primary-01 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-md mt-0.5">
                Client
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-4 sm:mt-5 mb-3 sm:mb-4 bg-neutral-50/80 rounded-xl p-3 sm:p-4 border border-neutral-100">
          <span className="absolute -top-2.5 sm:-top-3 left-2 sm:left-3 text-2xl sm:text-3xl text-primary-02/40 font-serif select-none">“</span>
          <p className="text-neutral-800 text-xs sm:text-sm leading-relaxed font-medium italic relative z-10 line-clamp-3 pl-1 sm:pl-2">
            {review.comment}
          </p>
        </div>
      </div>

      <div className="mt-1 sm:mt-2 pt-2 sm:pt-3 border-t border-dashed border-secondary-01/20 flex items-center justify-between text-[11px] sm:text-xs text-secondary-01 font-semibold gap-2">
        <div className="flex items-center gap-1 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary-01/60 shrink-0" />
          <span className="truncate max-w-30 sm:max-w-45 md:max-w-50">{review.user.email}</span>
        </div>
        <span className="bg-neutral-100 px-1.5 sm:px-2 py-0.5 rounded text-neutral-600 font-medium shrink-0">{formattedDate}</span>
      </div>
    </div>
  );
};

export default MyReceivedReviewCard;