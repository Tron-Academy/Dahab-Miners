import React from "react";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";

export default function AbudhabiContactUs() {
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
      <div className="customborder p-10 flex md:flex-row flex-col gap-5 justify-between items-center">
        <div className="flex flex-col md:items-start items-center gap-3">
          <h5 className="text-[#0194FE] text-3xl md:text-left text-center font-semibold">
            Ready to Start Mining?
          </h5>
          <p className="text-[#A1D3F8] md:text-left text-center">
            Whether you need a miner, hosting, or expert guidance, we’re here to
            help. Let’s get you mining today!
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-full btn-bg"
          onClick={() => handleChatClick()}
        >
          Contact Us
        </button>
      </div>
    </motion.div>
  );
}
