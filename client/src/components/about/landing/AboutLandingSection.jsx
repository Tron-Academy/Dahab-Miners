import React from "react";
import AboutUsDetailElt from "./AboutUsDetailElt";
import { motion } from "framer-motion";

export default function AboutLandingSection() {
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 min-h-[640px] flex flex-col gap-5 items-center">
      <div className="flex flex-col items-center gap-5">
        <h4 className="gradient-heading font-semibold text-3xl text-center">
          Welcome to Dahab Miners
        </h4>
        <p className="max-w-[600px] text-center">
          At Dahab Miners, we specialize in Crypto mining infrastructure,
          offering top-tier solutions for hardware procurement, hosting, and
          repair services. Our state-of-the-art facilities and industry
          expertise ensure seamless mining operations, whether you’re looking to
          buy, host, or maintain ASIC miners.
        </p>
      </div>
      <div className="flex md:flex-row flex-col-reverse justify-between items-center gap-10 my-10">
        <div className="flex flex-col md:items-start items-center gap-5">
          <p className="text-sm gradient-heading md:text-stat text-center">
            About us
          </p>
          <h5 className="text-[#2295B7] text-2xl md:text-start text-center">
            Leading Crypto Mining Company in Abu Dhabi, UAE
          </h5>
          <p className="max-w-[600px] md:text-start text-center">
            With years of experience in the UAE, we’ve built a seamless mining
            ecosystem for our clients. From sourcing the most profitable mining
            machines to providing top-tier hosting services, we ensure optimal
            performance and uptime.
          </p>
          <p className="max-w-[600px] md:text-start text-center">
            Our facilities feature IoT-based controls, expert infrastructure
            setup, and round-the-clock maintenance to ensure maximum efficiency
            and uptime. We also provide free miner configuration, pool setup
            assistance, and on-site repair services to keep your operations
            running smoothly.
          </p>
          <p className="max-w-[600px] md:text-start text-center">
            Visit our crypto-hosting center in Abu Dhabi and take your mining
            operations to the next level!
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
            stat={"3000+"}
            content={"ASIC Miners Hosted"}
            style={"rounded-tl-[35px] rounded-bl-[35px] rounded-br-[35px]"}
          />
          <AboutUsDetailElt
            stat={"30 MW+"}
            content={"Combined capacity of 30+ MW"}
            style={"rounded-tr-[35px] rounded-tl-[35px] rounded-br-[35px]"}
          />
          <AboutUsDetailElt
            stat={"2"}
            content={"Hosting across 2 nations"}
            style={"rounded-tl-[35px] rounded-bl-[35px] rounded-br-[35px]"}
          />
          <AboutUsDetailElt
            stat={"0%"}
            content={"Commission on Mining Earnings"}
            style={"rounded-tl-[35px] rounded-tr-[35px] rounded-br-[35px]"}
          />
        </motion.div>
      </div>
    </section>
  );
}
