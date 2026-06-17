import Image from "next/image";
import { ITrainerProps } from "./AllTrainers";
import Link from "next/link";

const TrainerCard = ({ trainer }: { trainer: ITrainerProps }) => {
  const trainerImage = trainer?.user?.image && trainer.user?.image.trim() !== "" ? trainer.user?.image : "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&auto=format&fit=crop&q=60";

  return (
    <Link href={`/trainers/${trainer.id}`} className="group relative w-full aspect-4/3 bg-neutral-100 border border-neutral-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl">
      <Image
        src={trainerImage}
        alt={trainer.user.name}
        fill
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Top Right Corner Badge */}
      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm border border-neutral-200/60 rounded-lg px-4 shadow-sm">
        <span className="text-primary-01 text-sm font-black tracking-wider uppercase select-none">
          TRAINER
        </span>
      </div>

      {/* Default State: Trainer Name overlay at the bottom */}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/40 to-transparent p-4 pt-10 z-10 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-base font-bold text-white tracking-wide uppercase drop-shadow-sm text-center">
          {trainer.user.name}
        </h3>
      </div>

      {/* Hover State Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 z-10">
        <h3 className="text-xl font-black text-white tracking-wide mb-1 uppercase">
          {trainer.user.name}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-bold text-white">
            {trainer?.avgRating.toFixed(1)} / 5.0
          </span>
        </div>

        <span className="text-lg font-black text-primary-01">
          ${trainer?.feePerHour.toFixed(2)} / hr
        </span>
      </div>
    </Link>
  );
};

export default TrainerCard;