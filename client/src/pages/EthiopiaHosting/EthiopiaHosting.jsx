import React from "react";
import EthiopiaLanding from "../../components/EthiopiaHosting/EthiopiaLanding";
import AbuDgabiFeatureSection from "../../components/AbuDhabiHosting/features/AbuDgabiFeatureSection";
import EthiopiaAdvantagesSection from "../../components/EthiopiaHosting/EthiopiaAdvantages/EthiopiaAdvantagesSection";
import EthiopiaAdvantage2Section from "../../components/EthiopiaHosting/EthiopiaAdvantages2/EthiopiaAdvantage2Section";
import EthiopiaSafetySection from "../../components/EthiopiaHosting/EthiopiaSafety/EthiopiaSafetySection";
import AbudhabiConsulting from "../../components/AbuDhabiHosting/abudhabiconsulting/AbudhabiConsulting";
import AbudhabiContactUs from "../../components/AbuDhabiHosting/abudhabiContact/AbudhabiContactUs";

export default function EthiopiaHosting() {
  return (
    <div>
      <EthiopiaLanding />
      <AbuDgabiFeatureSection />
      <EthiopiaAdvantagesSection />
      <EthiopiaAdvantage2Section />
      <EthiopiaSafetySection />
      <AbudhabiConsulting />
      <AbudhabiContactUs />
    </div>
  );
}
