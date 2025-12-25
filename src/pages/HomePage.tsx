import CallToAction from "@/components/modules/Home/CallToAction";
import Contact from "@/components/modules/Home/Contact";
import Faq from "@/components/modules/Home/Faq";
import Features from "@/components/modules/Home/Features";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import Pricing from "@/components/modules/Home/Pricing";
import StatsStrip from "@/components/modules/Home/StatsStrip";
import TrustSecurity from "@/components/modules/Home/TrustSecurity";
import { useUserInfoQuery } from "@/redux/features/auth/auth";

export default function HomePage() {
  const { data: userInfo } = useUserInfoQuery();
  return (
    <>
      <Hero />
      <Features />
      <TrustSecurity />
      <HowItWorks />
      {!userInfo && <Pricing />}
      <StatsStrip />
      <Faq />
      <Contact />
      <CallToAction />
    </>
  );
}
