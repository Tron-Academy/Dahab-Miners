import { motion } from "framer-motion";
import React from "react";

export default function FeatureCard({ title, content }) {
  return (
    <motion.div
      className="bg-[#060E23] p-5 rounded-lg flex flex-col gap-10 justify-center text-center items-center"
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
      <h1 className="text-2xl font-semibold text-[#1ECBAF]">{title}</h1>
      <p className="text-sm font-normal text-white leading-6 max-w-[317px] text-center">
        {content}
      </p>
    </motion.div>
  );
}
