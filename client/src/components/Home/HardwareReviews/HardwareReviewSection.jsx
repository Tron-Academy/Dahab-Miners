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
            Why DAHAB Miners is Your Ideal Crypto Mining Partner
          </h4>
          <p className="text-5xl font-medium">4.9/5</p>
          <div className="flex gap-3 items-center">
            <div className="flex gap-1 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h3 className="text-lg font-medium">
              Trusted by 100+ Happy Customers
            </h3>
          </div>
        </div>
        <HardwareReviewCard
          icon={<CiHeart />}
          content={`Customer-Centric Approach: Your growth is our mission. We succeed only when you profit.`}
        />
        <HardwareReviewCard
          icon={<BsTruck />}
          content={`Lightning-Fast Service: From procurement to shipping, we ensure swift and hassle-free delivery.`}
        />
        <HardwareReviewCard
          icon={<FaRegComment />}
          content={
            "Expert Guidance: Get transparent and professional advice to maximize your mining success."
          }
        />
        <HardwareReviewCard
          icon={<CgDatabase />}
          content={`Comprehensive Solutions: We handle everything—hosting, repairs, and after-sales support—all under one roof.`}
        />
      </motion.div>
    </section>
  );
}
