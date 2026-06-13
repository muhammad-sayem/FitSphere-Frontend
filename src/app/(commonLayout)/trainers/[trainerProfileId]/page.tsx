import { trainerServices } from "@/services/trainer.services";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TrainerDetailsPage = async ({ params }: { params: Promise<{ trainerProfileId: string }> }) => {
  const { trainerProfileId } = await params;
  const { data: trainerProfile } = await trainerServices.getTrainerProfileByTrainerProfileId(trainerProfileId);

  if (!trainerProfile) {
    return (
      <div className="w-11/12 max-w-7xl mx-auto py-20 text-center">
        <p className="text-secondary-01 font-semibold text-lg">Trainer profile not found.</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-8 bg-white text-black min-h-[calc(100vh-100px)] flex flex-col justify-start">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch w-full">

        <div className="lg:col-span-2 flex flex-col justify-between gap-6">

          <div className="w-full flex flex-col sm:flex-row gap-8 bg-gray-50/60 p-8 rounded-2xl border border-gray-100/80 flex-1">
            <div className="w-full sm:w-64 h-64 shrink-0 rounded-2xl overflow-hidden shadow-md border border-gray-100 mx-auto sm:mx-0">
              <Image
                src={trainerProfile.user?.image || "/api/placeholder/400/400"}
                alt={trainerProfile.user?.name}
                className="w-full h-full object-cover"
                width={400}
                height={400}
              />
            </div>

            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center justify-between gap-6 mb-3">
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    {trainerProfile.user?.name}
                  </h1>
                  <div className="flex items-center gap-1.5 bg-primary-01/10 px-3 py-1 rounded-full shrink-0">
                    <Star className="w-6 h-6 text-primary-01" />
                    <span className="text-black text-lg font-bold">{trainerProfile.avgRating.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-primary-01 font-bold text-base md:text-lg mb-4">
                  {trainerProfile.specialties} Expert
                </p>

                <p className="text-secondary-01 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
                  {trainerProfile.bio}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-5">
                <div>
                  <p className="text-xs text-secondary-01 uppercase tracking-wider font-medium mb-1">Experience</p>
                  <p className="text-lg md:text-xl font-extrabold">{trainerProfile.experience} Years</p>
                </div>
                <div>
                  <p className="text-xs text-secondary-01 uppercase tracking-wider font-medium mb-1">Hourly Rate</p>
                  <p className="text-lg md:text-xl font-extrabold text-primary-01">${trainerProfile.feePerHour}/hr</p>
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-secondary-01 uppercase tracking-wider font-medium mb-1">Verified Email</p>
                  <p className="text-sm md:text-base font-bold truncate">{trainerProfile.user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-extrabold mb-3">About the Training Program</h3>
            <p className="text-secondary-01 text-sm md:text-base leading-relaxed mb-6">
              Welcome to the specialized program led by {trainerProfile.user?.name}. This training regimen is tailored specifically around {trainerProfile.specialties.toLowerCase()} principles, drawing from over {trainerProfile.experience} years of hands-on, elite competitive experience.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <span className="bg-gray-50 border border-gray-200 text-black text-xs font-semibold px-4 py-2 rounded-xl">Personalized Plan</span>
              <span className="bg-gray-50 border border-gray-200 text-black text-xs font-semibold px-4 py-2 rounded-xl">1-on-1 Sessions</span>
              <span className="bg-gray-50 border border-gray-200 text-black text-xs font-semibold px-4 py-2 rounded-xl">Progress Tracking</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-black text-white rounded-2xl p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-extrabold mb-1.5 text-white">Book a Session</h3>
            <p className="text-xs text-gray-400 mb-8">Check availability and start training instantly</p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-gray-400">Session Fee per hour</span>
                <span className="font-semibold text-white">${trainerProfile.feePerHour}.00</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-gray-400">Platform Fee</span>
                <span className="font-semibold text-white">$0.00</span>
              </div>
              <div className="h-px bg-gray-800 my-2"></div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm md:text-base text-gray-400">Total Fee</span>
                <span className="text-2xl font-extrabold text-primary-01">${trainerProfile.feePerHour}.00</span>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Link href={`/trainers/${trainerProfile.id}/available-slots`} className="w-full bg-primary-01 text-white text-sm md:text-base font-bold py-4 px-6 rounded-xl transition-all active:scale-[0.98] duration-200 hover:bg-orange-500 hover:cursor-pointer text-center shadow-lg shadow-primary-01/20">
              Book Session with {trainerProfile.user?.name?.split(' ')[0]}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrainerDetailsPage;