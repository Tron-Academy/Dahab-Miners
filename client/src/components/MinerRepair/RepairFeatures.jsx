import React from "react";
import FeatureCard from "./FeatureCard";

export default function RepairFeatures({ scrollfunction }) {
  return (
    <div className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FeatureCard
          title={"Clear and Honest Pricing"}
          content={
            "Discover our upfront pricing for all services. Our transparent pricing guide ensures you know what to expect with no hidden fees. Benefit from competitive rates on diagnostics, part replacements, and full repairs."
          }
        />
        <FeatureCard
          title={"Rapid Service Turnaround"}
          content={
            "We value your time in the fast-paced world of cryptocurrency mining. Our efficient repair process ensures minimal downtime. Expect swift turnaround times without compromising quality."
          }
        />
        <FeatureCard
          title={"Comprehensive Diagnostics"}
          content={
            "Our in-depth diagnostics accurately pinpoint issues with your ASIC miners. Whether diagnosing full units or specific parts, we identify problems precisely to deliver effective repair solutions."
          }
        />
      </div>
      {/* <div className="flex justify-center my-10">
        <button
          onClick={scrollfunction}
          className="text-lg font-semibold bg-[#1ECBAF] px-10 py-3 text-white rounded-lg hover:bg-btnHover nav-link"
        >
          View Pricing
        </button>
      </div> */}
    </div>
  );
}
