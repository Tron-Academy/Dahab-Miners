import React, { useEffect } from "react";
import AbudhabiLanding from "../../components/AbuDhabiHosting/AbudhabiLanding";
import AbuDgabiFeatureSection from "../../components/AbuDhabiHosting/features/AbuDgabiFeatureSection";
import WhyAbudhabiSection from "../../components/AbuDhabiHosting/whyAbudhabi/WhyAbudhabiSection";
import SecurityMeasuresSection from "../../components/AbuDhabiHosting/securityMeasures/SecurityMeasuresSection";
import AbudhabiTechnologySection from "../../components/AbuDhabiHosting/technology/AbudhabiTechnologySection";
import AbudhabiConsulting from "../../components/AbuDhabiHosting/abudhabiconsulting/AbudhabiConsulting";
import AbudhabiContactUs from "../../components/AbuDhabiHosting/abudhabiContact/AbudhabiContactUs";
import { useLocation } from "react-router-dom";

export default function AbuDhabiHosting() {
  const location = useLocation();
  const fullUrl = window.location.origin + location.pathname + location.search;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <AbudhabiLanding />
      <AbuDgabiFeatureSection />
      <WhyAbudhabiSection />
      <SecurityMeasuresSection />
      <AbudhabiTechnologySection />
      <AbudhabiConsulting />
      <AbudhabiContactUs />
    </div>
  );
}
