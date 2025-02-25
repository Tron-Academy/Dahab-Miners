import React, { useState } from "react";
import DescriptionBox from "../Home/mapsection/DescriptionBox";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MapComparison() {
  const [isHover1, setIsHover1] = useState(true);
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
      className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-20 text-white flex lg:flex-row flex-col items-center lg:justify-between gap-20"
    >
      <div className="flex flex-col lg:items-start items-center gap-5 lg:max-w-[470px]">
        <h4 className="text-[40px] gradient-heading font-semibold lg:text-left text-center">
          Strategic Global Locations
        </h4>
        <p className="text-sm max-w-[350px] lg:text-left text-center">
          We operate state-of-the-art mining farms in key locations, ensuring
          stable power, secure facilities, and optimal performance for your
          miners
        </p>
        <div className="flex gap-3 items-center">
          <button
            // to={"/host/abudhabi"}
            onClick={() => {
              setIsHover1(true);
              setIsHover2(false);
            }}
            className={`px-4 py-2 rounded-lg ${
              isHover1
                ? "bg-[#0194FE] text-white"
                : "bg-[#051D2E] text-[#1994B0]"
            }  hover:scale-110 ease-in-out duration-500 hover:shadow-sm hover:shadow-[#0194FE] `}
          >
            UAE
          </button>
          <button
            // to={"/host/ethiopia"}
            onClick={() => {
              setIsHover1(false);
              setIsHover2(true);
            }}
            className={`px-4 py-2 ${
              isHover2
                ? "bg-[#0194FE] text-white"
                : "bg-[#051D2E] text-[#1994B0]"
            } rounded-lg  hover:scale-110 ease-in-out duration-500 hover:shadow-sm hover:shadow-[#1994B0]`}
          >
            ETHIOPIA
          </button>
        </div>
        <div className="flex justify-between items-center w-full z-[1]">
          <div>
            <p className="text-[#0194FE] text-4xl font-semibold">
              {isHover1 ? "2K+" : "3K+"}
            </p>
            <p className="text-sm">Miners Hosted</p>
          </div>
          <div>
            <p className="text-[#0194FE] text-4xl font-semibold">
              {isHover1 ? "250+" : "10+"}
            </p>
            <p className="text-sm">Active Clients</p>
          </div>
          <div>
            <p className="text-[#0194FE] text-4xl font-semibold">
              {isHover1 ? "5+" : "30+"}
            </p>
            <p className="text-sm">MW Capacity</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <img src="/home/map.png" />
        <img
          className="absolute right-[42%] bottom-[45%] z-10 w-3 cursor-pointer"
          src="/home/location-1.png"
          // onMouseEnter={() => setIsHover2(true)}
          // onMouseLeave={() => setIsHover2(false)}
        />
        <img
          className="absolute right-[38%] top-[33%] w-3 cursor-pointer"
          src="/home/location-2.png"
          // onMouseEnter={() => setIsHover1(true)}
          // onMouseLeave={() => setIsHover1(false)}
        />
        {isHover1 && (
          <DescriptionBox
            flag={"/home/uae.png"}
            place={"UAE"}
            amt={"$0.06 / kWh"}
            position={"md:right-[18%] right-4 md:top-[18%] top-5 bg-[#07EAD3]"}
          />
        )}
        {isHover2 && (
          <DescriptionBox
            flag={"/home/ethiopia.png"}
            place={"ETHIOPIA"}
            amt={"$0.05 / kWh"}
            position={
              "md:right-[22%] right-10 md:bottom-[30%] bottom-5 bg-white"
            }
          />
        )}
      </div>
    </motion.section>
  );
}
