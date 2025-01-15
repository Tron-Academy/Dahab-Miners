import React from "react";
import AbudhabiLanding from "../../components/AbuDhabiHosting/AbudhabiLanding";
import AbuDgabiFeatureSection from "../../components/AbuDhabiHosting/features/AbuDgabiFeatureSection";
import WhyAbudhabiSection from "../../components/AbuDhabiHosting/whyAbudhabi/WhyAbudhabiSection";
import SecurityMeasuresSection from "../../components/AbuDhabiHosting/securityMeasures/SecurityMeasuresSection";
import AbudhabiTechnologySection from "../../components/AbuDhabiHosting/technology/AbudhabiTechnologySection";
import AbudhabiConsulting from "../../components/AbuDhabiHosting/abudhabiconsulting/AbudhabiConsulting";
import AbudhabiContactUs from "../../components/AbuDhabiHosting/abudhabiContact/AbudhabiContactUs";

export default function AbuDhabiHosting() {
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
