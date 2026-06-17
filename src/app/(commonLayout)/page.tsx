import HealthTips from "@/components/CommonLayouts/Home/HealthTips";
import HeroSection from "@/components/CommonLayouts/Home/HeroSection";
import MostPopularTrainersMain from "@/components/CommonLayouts/Home/MostPopularTrainersMain";
import OurPrograms from "@/components/CommonLayouts/Home/OurPrograms";
import QuoteSection from "@/components/CommonLayouts/Home/QuoteSection";
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
      <HealthTips />
      <OurPrograms />
      <MostPopularTrainersMain />
      <QuoteSection />
    </div>
  );
}
