import React from "react";
import { FaStar } from "react-icons/fa";
import HardwareReviewCard from "./HardwareReviewCard";
import { CiHeart } from "react-icons/ci";
import { BsTruck } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import { CgDatabase } from "react-icons/cg";
import { motion } from "framer-motion";

export default function HardwareReviewSection() {
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 pt-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
        variants={sectionVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-7"
      >
        <div className="text-white flex flex-col gap-5 lg:col-span-2 lg:self-center">
          <h4 className="text-[40px] font-semibold gradient-heading max-w-[680px]">
            Why you should buy your mining hardware from DAHAB miners
          </h4>
          {/* <p className="text-5xl font-medium">4.9/5</p>
          <div className="flex gap-3 items-center">
            <div className="flex gap-1 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h3 className="text-lg font-medium">Based on 100+ reviews</h3>
          </div> */}
        </div>
        <HardwareReviewCard
          icon={<CiHeart />}
          content={`Dahab Miner's mission statement: "Our success depends on your satisfaction and profitability. We're committed to ensuring you thrive because your success is our success." As a Bitcoin mining agency in UAE, we prioritize your growth, ensuring that our services are aligned with your success and the profitability of our bitcoin mining machines in Dubai.
`}
        />
        <HardwareReviewCard
          icon={<BsTruck />}
          content={`As a Crypto mining company in UAE, we ensure fast processing and shipping times to meet your needs efficiently and reliably, guaranteeing that your bitcoin mining machines in Dubai receive the support they need for your crypto mining operations when they need it.
`}
        />
        <HardwareReviewCard
          icon={<FaRegComment />}
          content={
            "We offer professional and transparent consultation for your upcoming mining project, ensuring clarity and expert guidance throughout. Our expertise with Bitcoin Mining in Dubai guarantees that you receive the best solutions tailored to your needs."
          }
        />
        <HardwareReviewCard
          icon={<CgDatabase />}
          content={`We provide complete end-to-end crypto mining solutions, covering procurement, hosting, repair, and after-sales support, making us a leading Bitcoin Mining Agency in the UAE. Our comprehensive services ensure that every aspect of your mining operations is handled efficiently and effectively.
`}
        />
      </motion.div>
    </section>
  );
}
