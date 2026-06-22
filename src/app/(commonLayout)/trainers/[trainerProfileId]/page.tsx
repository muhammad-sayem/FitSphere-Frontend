import GiveReviewButton from "@/components/CommonLayouts/Trainer/GiveReviewButton";
import { reviewServices } from "@/services/review.services";
import { trainerServices } from "@/services/trainer.services";
import { userServices } from "@/services/user.services";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ReviewUser {
  name: string;
  email: string;
  image: string | null;
}

interface IReview {
  id: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  trainerId: string;
  userId: string;
  user: ReviewUser;
}

const TrainerDetailsPage = async ({ params }: { params: Promise<{ trainerProfileId: string }> }) => {
  const { trainerProfileId } = await params;
  const { data: trainerProfile } = await trainerServices.getTrainerProfileByTrainerProfileId(trainerProfileId);

  const { data: reviewsOfThisTrainer } = await reviewServices.getReviewsForTrainer(trainerProfileId) as { data: IReview[] | null };

  const currentUser = await userServices.getLoggedInUser();
  console.log("Current User in Trainer Details Page:", currentUser);

  if (!trainerProfile) {
    return (
      <div className="w-11/12 max-w-7xl mx-auto py-20 text-center">
        <p className="text-secondary-01 font-semibold text-lg">Trainer profile not found.</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-6 bg-white text-black min-h-[calc(100vh-100px)] flex flex-col justify-start">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">

        <div className="lg:col-span-2 flex flex-col justify-between gap-4">

          <div className="w-full flex flex-col sm:flex-row gap-6 bg-gray-50/60 p-6 rounded-2xl border border-gray-100/80 flex-1">
            <div className="w-full sm:w-48 h-48 shrink-0 rounded-2xl overflow-hidden shadow-md border border-gray-100 mx-auto sm:mx-0">
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
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    {trainerProfile.user?.name}
                  </h1>
                  <div className="flex items-center gap-1.5 bg-primary-01/10 px-2.5 py-0.5 rounded-full shrink-0">
                    <Star className="w-5 h-5 text-primary-01" />
                    <span className="text-black text-base font-bold">{trainerProfile.avgRating.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-primary-01 font-bold text-sm md:text-base mb-3">
                  {trainerProfile.specialties} Expert
                </p>

                <p className="text-secondary-01 text-xs md:text-sm leading-relaxed max-w-2xl mb-4">
                  {trainerProfile.bio}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-4">
                <div>
                  <p className="text-[10px] text-secondary-01 uppercase tracking-wider font-medium mb-0.5">Experience</p>
                  <p className="text-base md:text-lg font-extrabold">{trainerProfile.experience} Years</p>
                </div>
                <div>
                  <p className="text-[10px] text-secondary-01 uppercase tracking-wider font-medium mb-0.5">Hourly Fee</p>
                  <p className="text-base md:text-lg font-extrabold text-primary-01">${trainerProfile.feePerHour}/hr</p>
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] text-secondary-01 uppercase tracking-wider font-medium mb-0.5">Verified Email</p>
                  <p className="text-xs md:text-sm font-bold truncate">{trainerProfile.user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-extrabold mb-2">About the Training Program</h3>
            <p className="text-secondary-01 text-xs md:text-sm leading-relaxed mb-4">
              Welcome to the specialized program led by {trainerProfile.user?.name}. This training regimen is tailored specifically around {trainerProfile.specialties.toLowerCase()} principles, drawing from over {trainerProfile.experience} years of hands-on, elite competitive experience.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-50 border border-gray-200 text-black text-[11px] font-semibold px-3 py-1.5 rounded-xl">Personalized Plan</span>
              <span className="bg-gray-50 border border-gray-200 text-black text-[11px] font-semibold px-3 py-1.5 rounded-xl">1-on-1 Sessions</span>
              <span className="bg-gray-50 border border-gray-200 text-black text-[11px] font-semibold px-3 py-1.5 rounded-xl">Progress Tracking</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-black text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold mb-1 text-white">Book a Session</h3>
            <p className="text-[11px] text-gray-400 mb-6">Check availability and start training instantly</p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-400">Session Fee per hour</span>
                <span className="font-semibold text-white">${trainerProfile.feePerHour}.00</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-400">Platform Fee</span>
                <span className="font-semibold text-white">$0.00</span>
              </div>
              <div className="h-px bg-gray-800 my-1"></div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs md:text-sm text-gray-400">Total Fee</span>
                <span className="text-xl font-extrabold text-primary-01">${trainerProfile.feePerHour}.00</span>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Link href={`/trainers/${trainerProfile.id}/available-slots`} className="w-full bg-primary-01 text-white text-xs md:text-sm font-bold py-3 px-5 rounded-xl transition-all active:scale-[0.98] duration-200 hover:bg-orange-500 hover:cursor-pointer text-center shadow-lg shadow-primary-01/20">
              View Availability for {trainerProfile.user?.name?.split(' ')[0]}
            </Link>
          </div>
        </div>

      </div>

      <div className="mt-8 w-full lg:w-2/3">
        <div className="flex items-center justify-between pb-2 mb-4">
          <h3 className="text-xl font-extrabold text-black">Client Reviews</h3>
          <GiveReviewButton
            currentUser={currentUser}
            trainerProfileId={trainerProfileId}
          />
        </div>
        {reviewsOfThisTrainer && reviewsOfThisTrainer.length > 0 ? (
          <div className="space-y-4">
            {reviewsOfThisTrainer.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex flex-col gap-4 transition-all duration-300 hover:scale-[1] hover:border-primary-01">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                      <Image
                        src={review.user?.image || "/api/placeholder/100/100"}
                        alt={review.user?.name || "User"}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-black font-bold text-base">{review.user?.name}</h4>
                      <p className="text-secondary-01 text-xs">{new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-primary-01/10 px-2.5 py-1 rounded-lg shrink-0">
                    <Star className="w-4 h-4 text-primary-01 fill-primary-01" />
                    <span className="text-black text-sm font-extrabold">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-secondary-01 text-sm md:text-base leading-relaxed pl-1">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-secondary-01 font-medium text-sm">No reviews available yet for this trainer.</p>
        )}
      </div>
    </div>
  );
};

export default TrainerDetailsPage;