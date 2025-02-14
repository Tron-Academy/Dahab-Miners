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
        Why Choose Ethiopia for Crypto mining?
      </h4>
      <div className="lg:p-10 p-5 customborder flex lg:flex-row flex-col-reverse justify-between gap-5 items-center">
        <div>
          <EthiopiaAdvantageElt
            heading={"Powered by Ethiopia’s Hydropower Advantage"}
            content={
              "Our 30 MW mining facility runs entirely on cost-effective and renewable hydropower, powered by The Grand Ethiopian Renaissance Dam providing one of the lowest electricity rates for Bitcoin mining."
            }
          />
          <EthiopiaAdvantageElt
            heading={"Lowest Hosting Rates in the Market"}
            content={
              "Take advantage of ultra-low hosting costs, making mining in Ethiopia one of the most profitable options available."
            }
          />
          <EthiopiaAdvantageElt
            heading={"Scalable Infrastructure"}
            content={
              "Our container-based mining solutions are built for scalability, accommodating operations of any size above 50 miners. With no setup fees, we provide seamless hosting for serious miners looking to maximize profitability."
            }
          />
        </div>
        <img src="/3.jpg" className="max-w-[400px] object-cover rounded-md" />
      </div>
    </motion.div>
  );
}
