import React from "react";
import WhyElt from "./WhyElt";
import { motion } from "framer-motion";

export default function WhyAbudhabiSection() {
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
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex flex-col gap-10"
    >
      <h4 className="gradient-heading text-3xl font-semibold text-center">
        Why Choose Abu Dhabi for Crypto mining?
      </h4>
      <div className="p-10 customborder flex md:flex-row flex-col-reverse gap-10 items-center">
        <div className="flex flex-col gap-3">
          <WhyElt
            title={"Cost-Effective Hosting"}
            content={
              "Enjoy some of the most competitive electricity rates in the industry, ensuring higher profitability for your mining operations."
            }
          />
          <WhyElt
            title={"Stable & Secure Energy Supply"}
            content={
              "Abu Dhabi's power infrastructure, backed by oil, gas, and nuclear energy, guarantees a stable and uninterrupted power source for 24/7 mining."
            }
          />
          <WhyElt
            title={"Advanced Cooling Efficiency"}
            content={
              "With cutting-edge cooling systems and an optimized setup, our hosting facilities ensure your miners run efficiently even in high-temperature climates, with 95% uptime guaranteed."
            }
          />
          <WhyElt
            title={"Scalability & Infrastructure"}
            content={
              "From single-unit miners to large-scale operations, our hosting facilities are built for seamless expansion, offering up to 10 MW of capacity."
            }
          />
        </div>
        <img
          src="/7.jpg"
          alt="Bitcoin mining hosting Abu Dhabi"
          className="max-w-[500px] rounded-lg object-cover"
        />
      </div>
    </motion.section>
  );
}
