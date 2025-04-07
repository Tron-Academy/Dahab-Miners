import React, { useEffect } from "react";
import AbudhabiLanding from "../../components/AbuDhabiHosting/AbudhabiLanding";
import AbuDgabiFeatureSection from "../../components/AbuDhabiHosting/features/AbuDgabiFeatureSection";
import WhyAbudhabiSection from "../../components/AbuDhabiHosting/whyAbudhabi/WhyAbudhabiSection";
import SecurityMeasuresSection from "../../components/AbuDhabiHosting/securityMeasures/SecurityMeasuresSection";
import AbudhabiTechnologySection from "../../components/AbuDhabiHosting/technology/AbudhabiTechnologySection";
import AbudhabiConsulting from "../../components/AbuDhabiHosting/abudhabiconsulting/AbudhabiConsulting";
import AbudhabiContactUs from "../../components/AbuDhabiHosting/abudhabiContact/AbudhabiContactUs";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AbuDhabiHosting() {
  const location = useLocation();
  const fullUrl = window.location.origin + location.pathname + location.search;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Bitcoin Mining Hosting in Abu Dhabi | ASIC & Crypto Miner Hosting UAE</title>
        <meta
          name="description"
          content="Get secure and reliable Bitcoin mining hosting in Abu Dhabi. We offer top-quality ASIC miner hosting services and cryptocurrency mining solutions across the UAE. Optimize your mining performance today!
"
        />
        <meta
          name="keywords"
          content="Get secure and reliable Bitcoin mining hosting in Abu Dhabi. We offer top-quality ASIC miner hosting services and cryptocurrency mining solutions across the UAE. Optimize your mining performance today!
"
        />
        <link
          rel="canonical"
          href={
            fullUrl ||
            "https://dahabminers.com/host-miners/bitcoin-mining-hosting-abu-dhabi"
          }
        />
      </Helmet>
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
