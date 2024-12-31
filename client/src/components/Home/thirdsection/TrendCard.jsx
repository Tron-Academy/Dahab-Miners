import React from "react";
import SmallGraph from "./SmallGraph";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { motion } from "framer-motion";

export default function TrendCard({ icon, name, short, value, percent, data }) {
  return (
    <motion.div
      className="p-5 relative text-white w-[250px]"
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
        scale: 1.1,
        transition: { duration: 0.6, ease: "easeOut" },
      }}
      style={{
        borderStyle: "solid",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={icon} className="w-10" />
          <p className="text-sm">{short}</p>
          <p className="text-[10px] bg-[#B6B6B6] p-1 rounded-md text-black">
            {name}
          </p>
        </div>
        <p className="w-8 bg-[#2C223B] h-8 rounded-full flex justify-center items-center">
          <GoArrowUpRight />
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p>$ {value}</p>
          <p className="text-sm">{percent} %</p>
        </div>
        <SmallGraph data={data} color={"#5FCBC8"} />
      </div>
    </motion.div>
  );
}
