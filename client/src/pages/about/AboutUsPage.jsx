import React, { useEffect } from "react";
import AboutLandingSection from "../../components/about/landing/AboutLandingSection";
import WhyChooseUs from "../../components/Home/WhyChooseUs/WhyChooseUs";
import MapSection from "../../components/Home/mapsection/MapSection";
import RepairSolutions from "../../components/MinerRepair/RepairSolutions";
import AboutPageContactSection from "../../components/about/contactUs/AboutPageContactSection";

export default function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <AboutLandingSection />
      <WhyChooseUs />
      <MapSection />
      <RepairSolutions />
      <AboutPageContactSection />
    </div>
  );
}
