import HeroSection from "@/components/CommonLayouts/Home/HeroSection";
import OurPrograms from "@/components/CommonLayouts/Home/OurPrograms";
import { userServices } from "@/services/user.services";

export default async function Home() {
  const session = await userServices.getSession();
  console.log("Session Data:", session.data);

  // const access_token = session.data?.access_token;
  // console.log("Access Token:", access_token);

  const user = await userServices.getLoggedInUser();
  console.log("Logged In User:", user);

  return (
    <div>
      <HeroSection />
      <OurPrograms />
    </div>
  );
}
