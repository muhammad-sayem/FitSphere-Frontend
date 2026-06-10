import Image from "next/image";
import { IMyReviewCardProps } from "./MyReviews";

const MyReviewCard = ({ review }: { review: IMyReviewCardProps }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group relative bg-white border border-secondary-01/20 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-primary-01/40 shadow-sm hover:shadow-md overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-01 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary-02/30 bg-neutral-50">
                <Image
                  src={review.trainer.user.image}
                  alt={review.trainer.user.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://i.ibb.co.com/5R6S7b3/user-placeholder.png";
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 flex items-center gap-0.5 bg-primary-01 text-white px-1.5 py-0.5 rounded-lg text-[11px] font-black shadow-sm">
                <span>★</span>
                <span>{review.rating.toFixed(1)}</span>
              </div>
            </div>

            <div>
              <h3 className="text-black font-black text-base tracking-tight group-hover:text-primary-01 transition-colors duration-200 line-clamp-1">
                {review.trainer.user.name}
              </h3>
              <span className="inline-block bg-primary-02 text-primary-01 text-[11px] font-bold px-2.5 py-0.5 rounded-md mt-0.5">
                {review.trainer.specialties}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <p className="text-[10px] uppercase tracking-wider text-secondary-01 font-bold">Hourly Fee</p>
            <p className="text-lg font-black text-black">${review.trainer.feePerHour}<span className="text-xs font-normal text-secondary-01">/hr</span></p>
          </div>
        </div>

        <div className="relative mt-5 mb-4 bg-neutral-50/80 rounded-xl p-4 border border-neutral-100">
          <span className="absolute -top-3 left-3 text-3xl text-primary-02/40 font-serif select-none">“</span>
          <p className="text-neutral-800 text-sm leading-relaxed font-medium italic relative z-10 line-clamp-3 pl-2">
            {review.comment}
          </p>
        </div>
      </div>

      <div className="mt-2 pt-3 border-t border-dashed border-secondary-01/20 flex items-center justify-between text-xs text-secondary-01 font-semibold">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary-01/60" />
          <span>Experience: {review.trainer.experience} Years</span>
        </div>
        <span className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-600 font-medium">{formattedDate}</span>
      </div>
    </div>
  );
};

export default MyReviewCard;