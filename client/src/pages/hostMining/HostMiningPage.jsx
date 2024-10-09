import React, { useEffect } from "react";
import HostMiningHead from "../../components/HostMining/HostMiningHead";
import HostMiningDescription from "../../components/HostMining/HostMiningDescription";
import GraphSection from "../../components/HostMining/GraphSection";
import BuyBox from "../../components/HostMining/BuyBox";
import RequestHostingSection from "../../components/HostMining/RequestHostingSection";

export default function HostMiningPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <HostMiningHead />
      <HostMiningDescription />
      <GraphSection />
      <BuyBox />
      <RequestHostingSection />
    </div>
  );
}
