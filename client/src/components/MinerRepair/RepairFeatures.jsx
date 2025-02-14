import React from "react";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

export default function RepairFeatures({ scrollfunction }) {
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
      variants={sectionVariants}
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FeatureCard
          title={"Transparent Pricing"}
          content={
            "No surprises—just fair and upfront pricing. We offer competitive rates for diagnostics, part replacements, and full repairs, ensuring no hidden fees."
          }
        />
        <FeatureCard
          title={"Fast Turnaround Time"}
          content={
            "Time is money in mining. Our efficient repair process minimizes downtime, getting your ASIC miners back online quickly without sacrificing quality."
          }
        />
        <FeatureCard
          title={"Precision Diagnostics"}
          content={
            "We pinpoint and resolve issues with expert diagnostics. Whether it’s a full unit inspection or specific part replacement, we ensure a precise and effective repair solution."
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
    </motion.div>
  );
}
