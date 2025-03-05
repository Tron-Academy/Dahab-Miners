import React, { useEffect, useRef } from "react";
import MinerRepairHeadSection from "../../components/MinerRepair/MinerRepairHeadSection";
import RepairFeatures from "../../components/MinerRepair/RepairFeatures";
// import BuyBox from "../../components/HostMining/BuyBox";
import PriceSection from "../../components/MinerRepair/PriceSection";
import RepairSolutions from "../../components/MinerRepair/RepairSolutions";
import { Helmet } from "react-helmet-async";
import FAQSection from "../../components/Home/Faq/FAQSection";
import { useLocation } from "react-router-dom";

export default function MinerRepairPage() {
  const location = useLocation();
  const fullUrl = window.location.origin + location.pathname + location.search;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectedRef = useRef(null);
  const scrollToView = () => {
    selectedRef.current?.scrollIntoView({ behaviour: "smooth" });
  };
  return (
    <div>
      <Helmet>
        <link
          rel="canonical"
          href={fullUrl || "https://dahabminers.com/asic-miner-repair-dubai"}
        />
        <title>Expert Miner Repair Services in the UAE | Dahab Miners</title>
        <meta
          name="description"
          content="Get fast and efficient repair services for your mining equipment with Dahab Miners. We specialize in fixing crypto miners for optimal performance."
        />
        <meta
          name="keywords"
          content="ASIC miner repair Dubai, Cryptocurrency miner repair Abu Dhabi, Miner repair service, Bitcoin mining hardware repair UAE"
        />
      </Helmet>
      <MinerRepairHeadSection scrollfunction={scrollToView} />
      <RepairFeatures scrollfunction={scrollToView} />
      {/* <BuyBox /> */}

      <PriceSection ref={selectedRef} />
      <RepairSolutions />
      <FAQSection full />
      {/* <div className="h-[2px] bg-white"></div> */}
    </div>
  );
}
