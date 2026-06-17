import Gallery from "@/components/CommonLayouts/Home/Gallery";
import HealthTips from "@/components/CommonLayouts/Home/HealthTips";
import HeroSection from "@/components/CommonLayouts/Home/HeroSection";
import MostPopularTrainersMain from "@/components/CommonLayouts/Home/MostPopularTrainersMain";
import OurGoals from "@/components/CommonLayouts/Home/OurGoals";
import QuoteSection from "@/components/CommonLayouts/Home/QuoteSection";
import WhyChooseFitSphere from "@/components/CommonLayouts/Home/WhyChooseFitSphere";
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
      <QuoteSection />
      <OurGoals />
      <WhyChooseFitSphere />
      <MostPopularTrainersMain />
      <Gallery />
    </div>
  );
}
