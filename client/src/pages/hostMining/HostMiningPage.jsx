import React, { useEffect } from "react";
import HostMiningHead from "../../components/HostMining/HostMiningHead";
import HostMiningDescription from "../../components/HostMining/HostMiningDescription";
import GraphSection from "../../components/HostMining/GraphSection";
import BuyBox from "../../components/HostMining/BuyBox";
import RequestHostingSection from "../../components/HostMining/RequestHostingSection";
import { Helmet } from "react-helmet";
import FarmingLocations from "../../components/HostMining/FarmingLocations";
import MapSection from "../../components/Home/mapsection/MapSection";
import BitcoinConsulting from "../../components/HostMining/BitcoinConsulting";
import FAQSection from "../../components/Home/Faq/FAQSection";
import ContactButtonSection from "../../components/HostMining/ContactButtonSection";

export default function HostMiningPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <title>Secure Miner Hosting Services in the UAE | Dahab Miners</title>
        <meta
          name="description"
          content="Host your mining equipment securely with Dahab Miners' top-notch facilities in the UAE. Reliable and cost-effective miner hosting solutions."
        />
        <meta
          name="keywords"
          content="Bitcoin mining hosting Abu Dhabi, ASIC miner hosting services UAE, Crypto mining hosting UAE, Cryptocurrency miner hosting UAE"
        />
      </Helmet>
      <HostMiningHead />
      {/* <HostMiningDescription /> */}
      <GraphSection />
      <FarmingLocations />
      <MapSection />
      <BitcoinConsulting />
      <FAQSection />
      <ContactButtonSection />
      {/* <BuyBox /> */}
      {/* <RequestHostingSection /> */}
    </div>
  );
}
