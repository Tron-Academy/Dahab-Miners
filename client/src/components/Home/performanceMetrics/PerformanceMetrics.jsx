import React from "react";
import metrics from "../../../assets/metrics.svg";
import MetricsCard from "./MetricsCard";
import { motion } from "framer-motion";

export default function PerformanceMetrics() {
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex flex-col items-center gap-10 w-full">
      <motion.h4
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
        variants={sectionVariants}
        className="text-center text-5xl mb-5 font-semibold gradient-heading"
      >
        Dive into our performance Metrics
      </motion.h4>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-10 gap-3 justify-items-center w-full"
      >
        <MetricsCard stat={"4+"} content={"Years of Experience"} />
        <MetricsCard stat={"98%"} content={"average uptime"} />
        <MetricsCard stat={"15+"} content={"Total facilities"} />
        <MetricsCard stat={"24/7"} content={"Customer Support"} />
      </motion.div>
    </section>
  );
}
