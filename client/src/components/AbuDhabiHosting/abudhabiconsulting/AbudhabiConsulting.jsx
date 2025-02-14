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
          Expert Guidance for Your Mining Success
        </h5>
        <p className="text-center">
          Get free consultation, expert purchasing advice, miner configuration
          assistance, and tailored investment strategies—all at no extra cost.
        </p>
      </div>
      <div className="flex p-10 customborder gap-5 md:flex-row flex-col justify-between items-center mt-10">
        <img src="/5.jpg" className="max-w-[350px] rounded-lg object-cover " />
        <div className="flex flex-col gap-5 items-start">
          <AbudhabiConsultingDetailElt
            image={"/abudhabi/icon-4.png"}
            content={"Purchasing advice"}
            subContent={"Choose the best miner for your needs"}
          />
          <AbudhabiConsultingDetailElt
            image={"/abudhabi/icon-5.png"}
            content={"Free Miner Configuration"}
            subContent={"We help set up pools, worker IDs, and more."}
          />
          <AbudhabiConsultingDetailElt
            image={"/abudhabi/icon-6.png"}
            content={"Investment Strategy Planning"}
            subContent={"Get insights to maximize your mining profits."}
          />
          <AbudhabiConsultingDetailElt
            image={"/abudhabi/icon-7.png"}
            content={"Hassle-Free Setup"}
            subContent={"From selection to deployment, we make it easy."}
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
