import React from "react";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";

export default function ConsultationSection() {
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <div className="px-5 md:px-10 lg:px-[120px] py-10 gradient-bg">
      <div className="bg-white rounded-lg p-5 py-10 flex lg:flex-row flex-col gap-10 justify-around items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
          variants={sectionVariants}
          className="flex flex-col lg:items-start items-center lg:text-left text-center gap-10 max-w-[550px]"
        >
          <h4 className="text-[40px] font-semibold gradient-heading">
            Unlock Your Mining Potential with Expert Guidance
          </h4>
          <p className="text-lg font-medium leading-7">
            Get custom recommendations for your mining equipment needs,
            including buying, hosting, and repairs. <br></br>Expert consultation
            is just a call away!
          </p>
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 0.9, backgroundColor: "#7decda" }} // Change color on hover
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }} // Smooth animation
            className="text-base font-semibold text-white bg-btnGreen rounded-lg px-4 py-2 w-fit"
            onClick={handleChatClick}
          >
            Personal Consultation
          </motion.button>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
          variants={sectionVariants}
        >
          <div className="max-w-[490px] max-h-[340px] rounded-lg overflow-hidden">
            <img
              src="/consultation.webp"
              alt="Professional-advice-on-crypto-mining-in-abu-dhabi-UAE"
              title="Dahab Miners is the premier crypto mining service in UAE Explore our Bitcoin machines in Abu Dhabi and maximize your cryptocurrency earnings!"
            ></img>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
