import React, { useEffect } from "react";
import AboutLandingSection from "../../components/about/landing/AboutLandingSection";
import WhyChooseUs from "../../components/Home/WhyChooseUs/WhyChooseUs";
import MapSection from "../../components/Home/mapsection/MapSection";
import AboutPageContactSection from "../../components/about/contactUs/AboutPageContactSection";
import SolutionsSection from "../../components/about/SolutionsSection";

export default function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <AboutLandingSection />
      <WhyChooseUs />
      <MapSection />
      <SolutionsSection />
      <AboutPageContactSection />
    </div>
  );
}
