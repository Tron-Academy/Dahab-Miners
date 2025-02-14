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
        Ethiopia: A Prime Destination for Bitcoin Mining
      </h4>
      <div className="lg:p-10 p-5 flex justify-between lg:flex-row flex-col items-center gap-5 customborder">
        <img src="/abudhabi/img-2.jpg" className="max-w-[400px]" />
        <div className="flex flex-col gap-5">
          {/* <p>
            By harnessing hydropower, Ethiopia offers a sustainable and
            cost-effective source of energy for Bitcoin mining. This move is
            part of a larger initiative by Ethiopia to invest in the digital
            economy sector and expand renewable energy.
          </p> */}
          <EthiopiaAdvantageElt
            heading={"Low-Cost, Renewable Energy"}
            content={
              "Ethiopia’s Bitcoin mining industry thrives on affordable hydropower, providing one of the lowest electricity rates globally, making mining highly profitable"
            }
          />
          <EthiopiaAdvantageElt
            heading={"Strong Industry & Government Collaboration"}
            content={
              "Ethiopia is actively welcoming Bitcoin mining investments, with government-backed initiatives and infrastructure support driving long-term growth."
            }
          />
          <EthiopiaAdvantageElt
            heading={"Ideal Climate for Efficient Mining"}
            content={
              "With naturally cool temperatures and optimal altitude, Ethiopia’s climate helps maintain miners at peak efficiency, reducing the need for excessive cooling helping massively to ensure steady uptime and improving hardware lifespan."
            }
          />
        </div>
      </div>
    </motion.div>
  );
}
