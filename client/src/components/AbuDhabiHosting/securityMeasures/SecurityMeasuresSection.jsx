import { motion } from "framer-motion";
import React from "react";

export default function SecurityMeasuresSection() {
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
        Security Measures at Dahab Miners' Hosting Facilities
      </h4>
      <div className="p-10 customborder flex lg:flex-row-reverse flex-col-reverse gap-10">
        <div className="flex flex-col gap-5">
          <p>
            We take security seriously to ensure your mining hardware is
            protected at all times. Our facilities are equipped with advanced
            security protocols to safeguard your investment.
          </p>
          <ul className="ml-5 font-light">
            <li>
              <span className="font-semibold">
                24/7 Surveillance & Monitoring:
              </span>{" "}
              Our facilities are secured with high-definition surveillance
              cameras that monitor operations around the clock, detecting and
              recording any suspicious activities.
            </li>
            <li>
              <span className="font-semibold">
                On-Site Security & Staff Presence:
              </span>{" "}
              Trained security personnel and operations staff are present 24/7
              to oversee the facility, ensure smooth mining operations, and
              respond immediately to any issues.
            </li>
            <li>
              <span className="font-semibold">
                Liability Protection Against Negligence:
              </span>{" "}
              Dahab Miners takes full responsibility for any damages caused due
              to negligence on our part, such as theft, fire, or security
              breaches. However, natural disasters like floods or earthquakes
              are not covered under compensation policies.
            </li>
          </ul>
        </div>
        <img src="/abudhabi/img-2.jpg" className="object-cover" />
      </div>
    </motion.section>
  );
}
