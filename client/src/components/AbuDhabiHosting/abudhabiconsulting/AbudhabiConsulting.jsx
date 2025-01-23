import React from "react";
import AbudhabiConsultingDetailElt from "./AbudhabiConsultingDetailElt";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";

export default function AbudhabiConsulting() {
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
      variants={sectionVariants}
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10"
    >
      <div className="flex flex-col gap-4 items-center">
        <h5 className="text-3xl text-center font-semibold gradient-heading">
          Bitcoin & Mining Consulting
        </h5>
        <p className="text-center">
          Your needs always come first in our customer-centric advice. An
          excerpt of our consulting areas.
        </p>
      </div>
      <div className="flex p-10 customborder gap-5 md:flex-row flex-col justify-around items-center mt-10">
        <img src="/home/repair2.webp" className="max-w-[350px] rounded-lg " />
        <div className="flex flex-col gap-5 items-start">
          <AbudhabiConsultingDetailElt
            image={"/abudhabi/icon-4.png"}
            content={"Purchasing advice"}
          />
          <AbudhabiConsultingDetailElt
            image={"/abudhabi/icon-5.png"}
            content={"Bitcoin Mining"}
          />
          <AbudhabiConsultingDetailElt
            image={"/abudhabi/icon-6.png"}
            content={"Investing In Bitcoin"}
          />
          <AbudhabiConsultingDetailElt
            image={"/abudhabi/icon-7.png"}
            content={"Workshops & Training"}
          />
          <button
            className="px-4 py-2 rounded-lg btn-bg md:w-fit w-full"
            onClick={() => handleChatClick()}
          >
            Know More
          </button>
        </div>
      </div>
    </motion.section>
  );
}
