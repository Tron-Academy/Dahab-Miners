import React from "react";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";

export default function MiningRepairSection() {
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <div className="bg-homeBg px-5 md:px-10 lg:px-[120px] py-10">
      <div className="bg-white p-10 flex flex-col gap-10 rounded-lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
          variants={sectionVariants}
          className="flex xl:flex-row flex-col gap-5 xl:text-left text-center  justify-around items-center"
        >
          <div>
            <h3 className="text-base font-semibold text-homeBgGradient">
              Miner repair Abu Dhabi UAE
            </h3>
            <h4 className="text-[40px] font-semibold gradient-heading xl:max-w-[380px]">
              From Equipment to Maintenance : Your Complete Mining Partner
            </h4>
          </div>
          <p className="text-lg font-medium leading-7 xl:max-w-[400px]">
            Take your mining to the next level with our complete range of
            services. Get top-quality equipment, reliable hosting, and expert
            maintenance all in one place. Experience exceptional performance
            with our expert solutions and dedicated support.
          </p>
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, backgroundColor: "#7decda" }} // Change color on hover
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }} // Smooth animation
            className="text-base font-semibold text-white px-4 py-2 bg-btnGreen rounded-lg"
            onClick={handleChatClick}
          >
            Know More
          </motion.button>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
          variants={sectionVariants}
          className="flex 2xl:flex-row flex-col items-center justify-center gap-10 overflow-hidden"
        >
          <div className="max-w-[600px] max-h-[400px] overflow-hidden rounded-lg">
            <img
              className="max-w-[600px] max-h-[400px] overflow-hidden object-cover rounded-lg"
              src="/repair1.webp"
              alt="Expert-solutions-for-crypto-mining-in-abu-dhabi-UAE"
              title="Dahab Miners is the premier crypto mining service in UAE Explore our Bitcoin machines in Abu Dhabi and maximize your cryptocurrency earnings!"
            ></img>
          </div>
          <div className="max-w-[600px] max-h-[400px] overflow-hidden rounded-lg">
            <img
              src="/repair2.webp"
              className="max-w-[600px] max-h-[400px] overflow-hidden rounded-lg object-cover"
              alt="Durable-and-robust-asic-miners-in-abu-dhabi-UAE"
              title="Dahab Miners is the premier crypto mining service in UAE Explore our Bitcoin machines in Abu Dhabi and maximize your cryptocurrency earnings!"
            ></img>
          </div>
        </motion.div>
        <p className="text-center text-lg font-semibold">
          Seamless Mining Solutions for Every Need
        </p>
      </div>
    </div>
  );
}
