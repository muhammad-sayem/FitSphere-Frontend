import { slotServices } from "@/services/slot.services";
import { trainerServices } from "@/services/trainer.services";
import { userServices } from "@/services/user.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const MySlotsPage = async () => {

  const loggedInUser = await userServices.getLoggedInUser();
  console.log("[MySlotsPage] loggedInUser:", loggedInUser);

  if (!loggedInUser?.userId) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const trainerProfile = await trainerServices.getTrainerProfileByUserId(loggedInUser.userId, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  // console.log("[MySlotsPage] trainerProfile:", trainerProfile);

  const mySlots = await slotServices.getMySlots(trainerProfile?.data?.id, {
    headers: {
      Cookie: cookieHeader,
    }
  });

  return (
    <div>
      <h1>My Slots</h1>
      <p> {mySlots?.data?.length} slots available </p>
    </div>
  );
};

export default MySlotsPage;