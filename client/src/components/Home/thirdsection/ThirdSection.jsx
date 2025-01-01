import React from "react";
import MarketTrend from "./MarketTrend";
import HashCalculator from "./HashCalculator";

export default function ThirdSection() {
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[180px] py-10 flex flex-col gap-10">
      <MarketTrend />
      <HashCalculator />
    </section>
  );
}
