import React from "react";
import EthiopiaAdvantageElt from "../EthiopiaAdvantages/EthiopiaAdvantageElt";
import { motion } from "framer-motion";

export default function EthiopiaAdvantage2Section() {
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
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex flex-col items-center gap-10"
    >
      <h4 className="text-3xl font-semibold gradient-heading">
        Ethiopia: Advantages of a Bitcoin mining location
      </h4>
      <div className="lg:p-10 p-5 flex justify-between lg:flex-row flex-col items-center gap-5 customborder">
        <img src="/abudhabi/img-2.jpg" className="max-w-[400px]" />
        <div className="flex flex-col gap-5">
          <p>
            By harnessing hydropower, Ethiopia offers a sustainable and
            cost-effective source of energy for Bitcoin mining. This move is
            part of a larger initiative by Ethiopia to invest in the digital
            economy sector and expand renewable energy.
          </p>
          <EthiopiaAdvantageElt
            heading={"Strategic partnerships"}
            content={
              "The cooperation with Bitcoin mining companies and the Ethiopian government underlines the strategic importance of Ethiopia as a location for innovative and sustainable mining solutions."
            }
          />
          <EthiopiaAdvantageElt
            heading={"Optimal climate and geographical location"}
            content={
              "The altitude of Addis Ababa and the constant temperatures all year round are good conditions for mining. This ensures a good uptime and efficiency of the mining farm."
            }
          />
        </div>
      </div>
    </motion.div>
  );
}
