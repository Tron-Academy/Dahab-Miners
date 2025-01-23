import React, { useState } from "react";
import DescriptionBox from "./DescriptionBox";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MapSection() {
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
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
      className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 text-white flex lg:flex-row flex-col items-center lg:justify-between gap-20"
    >
      <div className="flex flex-col lg:items-start items-center gap-5 lg:max-w-[470px]">
        <h4 className="text-[40px] gradient-heading font-semibold lg:text-left text-center">
          Global Reach. Strategic Locations
        </h4>
        <p className="text-sm max-w-[350px] lg:text-left text-center">
          Our mining farms are strategically placed in the UAE and Ethiopia to
          maximize efficiency and profitability. Join a global network of crypto
          miners today
        </p>
        <div className="flex gap-3 items-center">
          <Link
            to={"/host/abudhabi"}
            className="px-4 py-2 rounded-lg bg-[#0194FE] hover:bg-[#52aced] hover:scale-110 ease-in-out duration-500 hover:shadow-sm hover:shadow-[#0194FE]"
          >
            UAE
          </Link>
          <Link
            to={"/host/ethiopia"}
            className="px-4 py-2 rounded-lg bg-[#051D2E] text-[#1994B0] hover:scale-110 ease-in-out duration-500 hover:shadow-sm hover:shadow-[#1994B0]"
          >
            ETHIOPIA
          </Link>
        </div>
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-[#0194FE] text-4xl font-semibold">2K+</p>
            <p className="text-sm">Miners Hosted</p>
          </div>
          <div>
            <p className="text-[#0194FE] text-4xl font-semibold">250+</p>
            <p className="text-sm">Customers</p>
          </div>
          <div>
            <p className="text-[#0194FE] text-4xl font-semibold">10+</p>
            <p className="text-sm">B2B Clients</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <img src="/home/map.png" />
        <img
          className="absolute right-[42%] bottom-[45%] z-10 w-3 cursor-pointer"
          src="/home/location-1.png"
          onMouseEnter={() => setIsHover2(true)}
          onMouseLeave={() => setIsHover2(false)}
        />
        <img
          className="absolute right-[38%] top-[33%] w-3 cursor-pointer"
          src="/home/location-2.png"
          onMouseEnter={() => setIsHover1(true)}
          onMouseLeave={() => setIsHover1(false)}
        />
        {isHover1 && (
          <DescriptionBox
            flag={"/home/uae.png"}
            place={"UAE"}
            amt={"$56,623.54"}
            position={"right-[18%] top-[18%] bg-[#07EAD3]"}
          />
        )}
        {isHover2 && (
          <DescriptionBox
            flag={"/home/ethiopia.png"}
            place={"ETHIOPIA"}
            amt={"$56,623.54"}
            position={"right-[22%] bottom-[30%] bg-white"}
          />
        )}
      </div>
    </motion.section>
  );
}

export default MapSection;
