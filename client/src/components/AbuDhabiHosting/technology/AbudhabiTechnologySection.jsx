import { motion } from "framer-motion";
import React from "react";

export default function AbudhabiTechnologySection() {
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
      <div className="flex lg:flex-row flex-col-reverse justify-between gap-3 items-center p-10 customborder">
        <div className="max-w-[600px] flex flex-col lg:items-start items-center gap-5">
          <h4 className="gradient-heading lg:text-left text-center text-3xl font-semibold">
            Cutting-Edge Technology for Maximum Mining Efficiency
          </h4>
          <p className="lg:text-left text-center">
            At Dahab Miners, we leverage advanced infrastructure to ensure
            maximum uptime, efficiency, and security for your mining operations.
          </p>
          <ul className="ml-5 font-light">
            <li>
              <span className="font-semibold">24/7 Security & Monitoring:</span>{" "}
              Our facilities are equipped with on-site staff and round-the-clock
              surveillance to keep your investment safe.
            </li>
            <li>
              <span className="font-semibold">
                State-of-the-Art Repair Facilities:
              </span>{" "}
              We are actively working towards setting up ASIC repair centers,
              ensuring fast and reliable maintenance for your miners.
            </li>
            <li>
              <span className="font-semibold">
                Optimized Hosting Conditions:
              </span>{" "}
              Our mining farms are designed for peak performance, with efficient
              cooling and power management systems.
            </li>
          </ul>
        </div>
        <img src="/1.jpg" className="max-w-[350px] object-cover rounded-md" />
      </div>
    </motion.section>
  );
}
