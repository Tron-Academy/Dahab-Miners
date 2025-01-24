import React from "react";
import FarmLocationCard from "./FarmLocationCard";
import { motion } from "framer-motion";

export default function FarmingLocations() {
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
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex flex-col items-center"
    >
      <h4 className="gradient-heading text-[40px] text-center font-semibold">
        Bitcoin mining farm locations
      </h4>
      <p className="text-sm text-center text-white max-w-[450px]">
        A service that allows our customers to concentrate on the mining itself
        while outsourcing the operation of the infrastructure to us.
      </p>
      <div className="flex md:flex-row flex-col justify-center gap-10 my-10">
        <FarmLocationCard
          image={"/home/repair2.webp"}
          power={"From $0.06 / kWh"}
          location={"Abu Dhabi"}
          hostingInfo={[
            "Hosting price: from $0.06 / kWh",
            "Minimum order quantity: 1 piece",
            "Setup fee; from $75",
          ]}
          generalInfo={[
            "Power Source: Various",
            "Capacity: 5 MW",
            "Accommodation: Various",
            "Security: Team on the site",
            "Camera surveillance: 24 hours",
          ]}
          path={"/host/abudhabi"}
        />
        <FarmLocationCard
          image={"/home/miningfacility.webp"}
          power={"From $0.05 / kWh"}
          location={"Ethiopia"}
          hostingInfo={[
            "Hosting price: from $0.05 / kWh",
            "Minimum order quantity: 50 piece",
            "Setup fee; None",
          ]}
          generalInfo={[
            "Power Source: Hydropower",
            "Capacity: 10 MW",
            "Accommodation: Warehouse",
            "Security: Armed Personal on the site",
            "Camera surveillance: 24 hours",
          ]}
          path={"/host/ethiopia"}
        />
      </div>
    </motion.section>
  );
}
