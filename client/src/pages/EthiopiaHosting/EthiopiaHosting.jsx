import React, { useEffect } from "react";
import EthiopiaLanding from "../../components/EthiopiaHosting/EthiopiaLanding";
import EthiopiaAdvantagesSection from "../../components/EthiopiaHosting/EthiopiaAdvantages/EthiopiaAdvantagesSection";
import EthiopiaAdvantage2Section from "../../components/EthiopiaHosting/EthiopiaAdvantages2/EthiopiaAdvantage2Section";
import EthiopiaSafetySection from "../../components/EthiopiaHosting/EthiopiaSafety/EthiopiaSafetySection";
import AbudhabiConsulting from "../../components/AbuDhabiHosting/abudhabiconsulting/AbudhabiConsulting";
import AbudhabiContactUs from "../../components/AbuDhabiHosting/abudhabiContact/AbudhabiContactUs";
import EthiopiaFeatures from "../../components/EthiopiaHosting/EthiopiaFeatures";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function EthiopiaHosting() {
  const location = useLocation();
  const fullUrl = window.location.origin + location.pathname + location.search;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <link
          rel="canonical"
          href={
            fullUrl ||
            "https://dahabminers.com/host-miners/bitcoin-mining-hosting-ethiopia"
          }
        />
      </Helmet>
      <EthiopiaLanding />
      <EthiopiaFeatures />
      <EthiopiaAdvantagesSection />
      <EthiopiaAdvantage2Section />
      <EthiopiaSafetySection />
      <AbudhabiConsulting />
      <AbudhabiContactUs />
    </div>
  );
}
