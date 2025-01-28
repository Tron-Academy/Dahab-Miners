import React from "react";
import WhyChooseCard from "./WhyChooseCard";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
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
      className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-20 flex md:flex-row flex-col-reverse md:justify-around gap-5 items-center relative z-[1]"
    >
      <motion.div
        initial={{ rotate: 50, opacity: 0 }} // Start rotated and invisible
        whileInView={{ rotate: 0, opacity: 1 }} // Rotate to 0 and fade in
        viewport={{ once: false, amount: 0.3 }} // Trigger animation only once
        transition={{ duration: 0.3, ease: "easeOut" }} // Animation settings
        className="grid grid-cols-2 grid-rows-5 md:gap-x-9 gap-x-2 w-[420px] h-[580px] z-[1] place-items-center"
      >
        <WhyChooseCard
          icon={"/home/c-3.png"}
          content={"Seamless Mining Setup"}
          position={"col-start-1 col-end-2 row-start-1 row-end-3"}
        />
        <WhyChooseCard
          icon={"/home/c-4.png"}
          content={"Cost-Effective Hosting"}
          position={"col-start-2 col-end-3 row-start-2 row-end-4"}
        />
        <WhyChooseCard
          icon={"/home/c-1.png"}
          content={"100% Earnings, No Cuts"}
          position={"col-start-1 col-end-2 row-start-3 row-end-5"}
        />
        <WhyChooseCard
          icon={"/home/c-2.png"}
          content={"Optimized Performance"}
          position={"col-start-2 col-end-3 row-start-4 row-end-6"}
        />
      </motion.div>
      <div className="bg-[#001030] w-[650px] h-[650px] absolute xl:left-0 lg:-left-[10%] -left-[30%] rounded-e-full md:block hidden"></div>
      <img
        src="/home/arrow-1.png"
        className="absolute bottom-[10%] left-[20%] md:block hidden"
      />
      <img
        src="/home/arrow-2.png"
        className="absolute top-[10%] right-[50%] md:block hidden"
      />
      <div className="flex flex-col md:items-start items-center gap-5 max-w-[350px]">
        <h4 className="text-3xl font-semibold gradient-heading md:text-left text-center">
          Why DAHAB Miners Is Your Trusted Mining Partner
        </h4>
        <p className="text-sm text-white w-[250px] md:text-left text-center">
          Purpose-built solutions to help you succeed in the world of crypto
          mining.
        </p>
        <button
          className="btn-bg px-5 py-2 rounded-lg text-white w-fit"
          onClick={() => handleChatClick()}
        >
          Contact Us
        </button>
      </div>
    </motion.section>
  );
}
