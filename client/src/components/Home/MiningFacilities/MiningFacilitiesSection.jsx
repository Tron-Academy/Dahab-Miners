import React from "react";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";
import FacilityCard from "./FacilityCard";

export default function MiningFacilitiesSection() {
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10">
      <div className=" p-10 flex flex-col gap-10 items-center rounded-lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
          variants={sectionVariants}
          className="flex flex-col gap-3 items-center"
        >
          <h4 className="md:text-4xl text-3xl font-semibold gradient-heading text-center">
            Effortless Hosting. Reliable Repairs
          </h4>
          <p className="text-white text-sm max-w-[550px] text-center">
            We provide end-to-end solutions for mining—hosting, maintenance, and
            repairs—so you can focus on what matters: maximizing your profits
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
          variants={sectionVariants}
          className="flex lg:flex-row flex-col items-center gap-5 justify-between w-full"
        >
          <FacilityCard
            title={"Cutting-Edge Mining Facilities"}
            content={
              "Our hosting farms offer secure, high-performance environments for your ASIC miners, ensuring peak efficiency and uptime."
            }
            image={"/home/miningfacility.webp"}
          />
          <FacilityCard
            title={"Repair Services and maintenance"}
            content={
              " Our expert repair team keeps your mining operations running smoothly, minimizing downtime and maximizing profitability."
            }
            image={"/home/repair2.webp"}
          />
        </motion.div>
      </div>
    </section>
  );
}
