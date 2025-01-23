import { motion } from "framer-motion";
import React from "react";

export default function EthiopiaSafetySection() {
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
      <div className="lg:p-10 p-5 customborder flex lg:flex-row flex-col justify-between items-center gap-5">
        <div className="flex flex-col gap-5">
          <h4 className="text-3xl gradient-heading font-semibold lg:text-start text-center">
            Safety & service of the mining farm in Ethiopia
          </h4>
          <p className="lg:text-start text-center">
            The safety of our facility and your investment is our top priority.
            MIM is equipped with a team of on-site staff and 24-hour camera
            surveillance to ensure safe operation around the clock.The Bitmain
            Repair Center and the MicroBT Repair Center (for Whatsminer) are
            currently opening new locations in Ethiopia, providing the important
            infrastructure for repairs and spare parts supply.
          </p>
        </div>
        <img src="/home/repair2.webp" className="max-w-[400px] rounded-md" />
      </div>
    </motion.div>
  );
}
