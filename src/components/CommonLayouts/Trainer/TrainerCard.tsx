import Image from "next/image";
import { ITrainerProps } from "./AllTrainers";
import Link from "next/link";

const TrainerCard = ({ trainer }: { trainer: ITrainerProps }) => {
  const trainerImage =
    trainer?.user?.image && trainer.user?.image.trim() !== ""
      ? trainer.user?.image
      : "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&auto=format&fit=crop&q=60";

  // Safeguard description fallback (using bio or description if available)
  const trainerDescription =
    trainer?.bio ||
    "Professional fitness trainer dedicated to helping you achieve your health and strength goals.";

  return (
    <div
      data-aos="zoom-in"
      className="group relative flex flex-col justify-between w-full bg-white border border-primary-01/25 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-01/15 hover:border-primary-01/50"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-4/3 overflow-hidden bg-primary-01/5">
        <Image
          src={trainerImage}
          alt={trainer.user.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-103"
        />

        {/* Rating Badge on Top of Image */}
        <div className="absolute top-3 right-3 z-10 bg-black/85 backdrop-blur-xs border border-primary-01/40 rounded-full px-2.5 py-1 shadow-xs flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-primary-01 fill-primary-01" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-bold text-white">
            {trainer?.avgRating ? trainer.avgRating.toFixed(1) : "0.0"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-bold text-black tracking-wide uppercase group-hover:text-primary-01 transition-colors duration-200 break-words [overflow-wrap:anywhere]">
            {trainer.user.name}
          </h3>

          {/* Truncated Description */}
          <p className="text-sm text-secondary-01 mt-2 line-clamp-3 sm:line-clamp-2 leading-relaxed">
            {trainerDescription}
          </p>
        </div>

        {/* Action and Pricing Section */}
        <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-primary-01/15 pt-4 mt-auto">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-secondary-02 font-bold">
              Hourly Rate
            </span>
            <span className="text-base font-extrabold text-primary-01 whitespace-nowrap">
              ${trainer?.feePerHour ? trainer.feePerHour.toFixed(2) : "0.00"}/hr
            </span>
          </div>

          {/* Details Button with Navigation */}
          <Link
            href={`/trainers/${trainer.id}`}
            className="inline-flex w-full xs:w-auto sm:w-auto items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-primary-01 rounded-lg hover:bg-black active:scale-98 transition-all duration-200 shrink-0"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;