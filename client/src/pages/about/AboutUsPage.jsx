import React, { useEffect } from "react";
import AboutLandingSection from "../../components/about/landing/AboutLandingSection";
import WhyChooseUs from "../../components/Home/WhyChooseUs/WhyChooseUs";
import MapSection from "../../components/Home/mapsection/MapSection";
import AboutPageContactSection from "../../components/about/contactUs/AboutPageContactSection";
import SolutionsSection from "../../components/about/SolutionsSection";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AboutUsPage() {
  const location = useLocation();
  const fullUrl = window.location.origin + location.pathname + location.search;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <link rel="canonical" href={fullUrl} />
      </Helmet>
      <AboutLandingSection />
      <WhyChooseUs />
      <MapSection />
      <SolutionsSection />
      <AboutPageContactSection />
    </div>
  );
}
