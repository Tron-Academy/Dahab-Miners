import React from "react";
import AboutUsDetailElt from "./AboutUsDetailElt";
import { motion } from "framer-motion";

export default function AboutLandingSection() {
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 min-h-[640px] flex flex-col gap-5 items-center">
      <div className="flex flex-col items-center gap-5">
        <h4 className="gradient-heading font-semibold text-3xl text-center">
          INTRODUCING DAHAB MINERS
        </h4>
        <p className="max-w-[600px] text-center">
          We provide a comprehensive range of services that cover both
          construction and hosting center setup, ensuring that your projects are
          executed with precision and success.
        </p>
      </div>
      <div className="flex md:flex-row flex-col-reverse justify-between items-center gap-10 my-10">
        <div className="flex flex-col md:items-start items-center gap-5">
          <p className="text-sm gradient-heading md:text-stat text-center">
            About us
          </p>
          <h5 className="text-[#2295B7] text-2xl md:text-stat text-center">
            Crypto Mining Company in Abu Dhabi, UAE
          </h5>
          <p className="max-w-[600px] md:text-start text-center">
            Our bitcoin mining journey in UAE in the last two years has helped
            us prepare a much easier path for you, through us! We help you get
            the most profitable crypto mining machines in Dubai at the best
            rates and host them for you here in the Middle east. We help you set
            up the infrastructure, IoT-based controls, and maintenance. We can
            even talk to you about risk management and hedging. Come visit us at
            our crypto-hosting center in Abu Dhabi, UAE!
          </p>
        </div>
        <motion.div
          className="grid grid-cols-2 gap-3 p-7"
          initial={{
            borderImageSource:
              "linear-gradient(to bottom right, #004DF480 0%, transparent 50%, transparent 50%, #0194FE80 100%)",
            borderWidth: "2px",
            borderImageSlice: 1,
            borderRadius: "12px",
            scale: 1,
          }}
          whileHover={{
            borderImageSource:
              "linear-gradient(to bottom right, #004DF480 0%, #A5E7F380 50%, #0194FE80 100%)",
            borderWidth: "2px",
            boxShadow: "0px 0px 20px rgba(1, 148, 254, 0.6)",
            scale: 1.01,
            transition: { duration: 0.6, ease: "easeOut" },
          }}
          style={{
            borderStyle: "solid",
          }}
        >
          <AboutUsDetailElt
            stat={"5+"}
            content={"Years of experience"}
            style={"rounded-tl-[35px] rounded-bl-[35px] rounded-br-[35px]"}
          />
          <AboutUsDetailElt
            stat={"97%"}
            content={"Approximate Uptime"}
            style={"rounded-tr-[35px] rounded-tl-[35px] rounded-br-[35px]"}
          />
          <AboutUsDetailElt
            stat={"2+"}
            content={"Total Facilities"}
            style={"rounded-tl-[35px] rounded-bl-[35px] rounded-br-[35px]"}
          />
          <AboutUsDetailElt
            stat={"24/7"}
            content={"Customer Support"}
            style={"rounded-tl-[35px] rounded-tr-[35px] rounded-br-[35px]"}
          />
        </motion.div>
      </div>
    </section>
  );
}
