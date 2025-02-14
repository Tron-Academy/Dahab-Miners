import { motion } from "framer-motion";
import React from "react";

export default function SolutionsSection() {
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
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 text-center "
    >
      <div className="p-10 customborder flex flex-col justify-center items-center gap-5">
        <p className="text-base font-semibold text-[#1ECBAF] mt-10">
          Elevate Your ASIC Repair Expertise Today
        </p>
        <h1 className="text-3xl lg:text-4xl pb-5 font-semibold gradient-heading shadow-[#1ECBAF] max-w-[768px] drop-shadow-2xl">
          {" "}
          Maximize Your Mining Potential with Expert ASIC Repair
        </h1>
        <p className="text-base font-medium text-white leading-6 max-w-[900px] mb-10">
          Ensure peak performance for your miners with our professional repair
          services. From diagnostics to full repairs, we keep your mining
          operations running smoothly with minimal downtime.
        </p>
      </div>
    </motion.div>
  );
}
