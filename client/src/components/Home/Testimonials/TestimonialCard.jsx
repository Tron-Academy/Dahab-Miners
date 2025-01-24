import React from "react";
import { TiTick } from "react-icons/ti";
import { MdOutlineStar } from "react-icons/md";
import { motion } from "framer-motion";

export default function TestimonialCard({ name, content, image }) {
  return (
    <motion.div
      className="p-3 py-2 bg-[#000618] text-white rounded-lg flex flex-col gap-5 min-h-[350px]"
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

        transition: { duration: 0.6, ease: "easeOut" },
      }}
      style={{
        borderStyle: "solid",
      }}
    >
      {/* <p className="text-sm font-medium text-[#98A2B3]">1 day ago</p> */}
      <h4 className="flex items-center gap-2 text-lg font-semibold">
        {name}
        <span className="text-btnGreen bg-[#1ECBAF33] rounded-full">
          <TiTick />
        </span>
      </h4>
      <img src={image} className="w-[50px]" />
      {/* <div className="flex gap-2 text-xl text-[#FDB022]">
        <MdOutlineStar />
        <MdOutlineStar />
        <MdOutlineStar />
        <MdOutlineStar />
        <MdOutlineStar />
      </div> */}
      <p className="text-base font-normal">"{content}"</p>
    </motion.div>
  );
}
