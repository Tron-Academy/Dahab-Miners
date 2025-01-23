import React from "react";
import EthiopiaAdvantageElt from "./EthiopiaAdvantageElt";
import { motion } from "framer-motion";

export default function EthiopiaAdvantagesSection() {
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
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex flex-col gap-10 items-center"
    >
      <h4 className="text-3xl font-semibold gradient-heading">
        The advantages of the Bitcoin Mining Farm in Ethiopia
      </h4>
      <div className="lg:p-10 p-5 customborder flex lg:flex-row flex-col-reverse justify-between gap-5 items-center">
        <div>
          <EthiopiaAdvantageElt
            heading={"Power source of the Grand Ethiopian Renaissance Dam"}
            content={
              "Our 30 MW plant is powered entirely by hydropower, Ethiopia's key to green energy. This enables us to offer our customers one of the most competitive hosting prices in the global Bitcoin mining market."
            }
          />
          <EthiopiaAdvantageElt
            heading={"Hosting price in Ethiopia"}
            content={
              "Bei MIM profitieren unsere Kunden von einem äußerst wettbewerbsfähigen Hosting-Preis von nur 4,0 Cent pro kWh. Dieser Preis spiegelt unser Engagement wider, Bitcoin-Mining für eine breite Palette von Investoren zugänglich zu machen."
            }
          />
          <EthiopiaAdvantageElt
            heading={"Capacity and accommodation of miners"}
            content={
              "With a capacity of 30 MW and the use of mining containers, we offer flexible and scalable solutions for your mining requirements. We accept orders for as little as one Asic miner with no setup fee. This makes us an attractive partner for your mining project of any size."
            }
          />
        </div>
        <img src="/home/miningfacility.webp" className="max-w-[400px]" />
      </div>
    </motion.div>
  );
}
