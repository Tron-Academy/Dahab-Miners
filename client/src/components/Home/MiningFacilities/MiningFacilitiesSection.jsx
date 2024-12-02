import React from "react";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";

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
    <div className="bg-homeBg px-5 md:px-10 lg:px-[120px] py-10">
      <div className="bg-white p-10 flex lg:flex-row flex-col gap-10 lg:justify-around items-center rounded-lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
          variants={sectionVariants}
          className="max-w-[500px] flex flex-col lg:items-start items-center lg:text-left text-center gap-5"
        >
          <div>
            <h4 className="text-base font-semibold text-btnGreen">
              Host Mining
            </h4>
            <h3 className="text-base font-semibold text-btnGreen">
              <a href="https://dahabminers.com/">
                ASIC Miner in Abu Dhabi, UAE
              </a>
            </h3>
          </div>

          <h5 className="text-[40px] font-semibold gradient-heading">
            Cutting-Edge Mining Facilities
          </h5>
          <p className="text-lg font-medium leading-7">
            Our mining farms provide the most modern and secure locations for
            your ASIC miners and crypto mining machine in UAE, ensuring optimal
            infrastucture conditions for peak performance
          </p>
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, backgroundColor: "#7decda" }} // Change color on hover
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }} // Smooth animation
            className="text-base w-fit font-semibold text-white px-4 py-2 rounded-lg bg-btnGreen"
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
          className="max-h-[330px] max-w-[478px] rounded-md overflow-hidden"
        >
          <img
            src="/miningfacility.webp"
            alt="Cutting-edge-technology-in-crypto-mining-machines-in-abu-dhabi-UAE"
            title="Looking for reliable crypto mining solutions in UAE? Dahab Miners provides cutting-edge ASIC miners in Abu Dhabi, perfect for beginners and pros alike. Check out our CRYPTO MINING MACHINES IN UAE and start mining efficiently today!"
          ></img>
        </motion.div>
      </div>
    </div>
  );
}
