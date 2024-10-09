import React, { useEffect, useRef } from "react";
import MinerRepairHeadSection from "../../components/MinerRepair/MinerRepairHeadSection";
import RepairFeatures from "../../components/MinerRepair/RepairFeatures";
import BuyBox from "../../components/HostMining/BuyBox";
import PriceSection from "../../components/MinerRepair/PriceSection";
import RepairSolutions from "../../components/MinerRepair/RepairSolutions";
import FAQ from "../../components/MinerRepair/FAQ";

export default function MinerRepairPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectedRef = useRef(null);
  const scrollToView = () => {
    selectedRef.current?.scrollIntoView({ behaviour: "smooth" });
  };
  return (
    <div>
      <MinerRepairHeadSection scrollfunction={scrollToView} />
      <RepairFeatures scrollfunction={scrollToView} />
      <BuyBox />

      <PriceSection ref={selectedRef} />
      <RepairSolutions />
      {/* <div className="h-[2px] bg-white"></div> */}
      <FAQ />
    </div>
  );
}
