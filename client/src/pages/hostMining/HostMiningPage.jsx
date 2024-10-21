import React, { useEffect } from "react";
import HostMiningHead from "../../components/HostMining/HostMiningHead";
import HostMiningDescription from "../../components/HostMining/HostMiningDescription";
import GraphSection from "../../components/HostMining/GraphSection";
import BuyBox from "../../components/HostMining/BuyBox";
import RequestHostingSection from "../../components/HostMining/RequestHostingSection";
import { Helmet } from "react-helmet";

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
        <meta name="keywords" content="Bitcoin Miner Hosting Services UAE" />
      </Helmet>
      <HostMiningHead />
      <HostMiningDescription />
      <GraphSection />
      <BuyBox />
      <RequestHostingSection />
    </div>
  );
}
