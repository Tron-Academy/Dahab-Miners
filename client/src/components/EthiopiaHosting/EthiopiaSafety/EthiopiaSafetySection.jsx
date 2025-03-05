import { motion } from "framer-motion";
import React from "react";

export default function EthiopiaSafetySection() {
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
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10"
    >
      <div className="lg:p-10 p-5 customborder flex lg:flex-row flex-col justify-between items-center gap-5">
        <div className="flex flex-col gap-5">
          <h4 className="text-3xl gradient-heading font-semibold lg:text-start text-center">
            Safety & Service of the Mining Farm in Ethiopia
          </h4>
          <p className="lg:text-start text-center">
            The security of your investment is our top priority. Our facility is
            safeguarded with Armed personnel at the gates and 24/7 on-site staff
            and round-the-clock surveillance, ensuring maximum protection.
          </p>
          <p className="lg:text-start text-center">
            Additionally, our agreement includes a compensation clause—in case
            of fire, theft, or any negligence on our part, we cover the damages.
          </p>
          <p className="lg:text-start text-center">
            To further enhance uptime, Bitmain and MicroBT Repair Centers are
            established in Ethiopia, With other major players like Icerivers and
            others opening their repair centers soon in Ethiopia ensuring fast
            repairs and a steady supply of spare parts for seamless operations.
          </p>
        </div>
        <img
          src="/2.jpg"
          alt="Bitcoin mining hosting Ethiopia"
          className="max-w-[400px] rounded-md object-cover"
        />
      </div>
    </motion.div>
  );
}
