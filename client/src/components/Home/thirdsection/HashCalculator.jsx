import { motion } from "framer-motion";
import React, { useState } from "react";

export default function HashCalculator() {
  const [value, setValue] = useState(0);
  const getBackgroundStyle = () => {
    const percentage = (value / 100000) * 100;
    return {
      background: `linear-gradient(to right, #1ECBAF  ${percentage}%, #1ECBAF59 ${percentage}%)`,
    };
  };
  return (
    <motion.div
      className="p-5 relative px-[100px] text-white my-10 rounded-lg"
      initial={{
        borderImageSource:
          "linear-gradient(to bottom right, #004DF480 0%, transparent 50%, transparent 50%, #0194FE80 100%)",
        borderWidth: "4px",
        borderImageSlice: 1,
        borderRadius: "12px",
      }}
      whileHover={{
        borderImageSource:
          "linear-gradient(to bottom right, #004DF480 0%, #A5E7F380 50%, #0194FE80 100%)",
        borderWidth: "4px",
        boxShadow: "0px 0px 20px rgba(1, 148, 254, 0.6)",
        borderRadius: "12px",
        transition: { duration: 0.6, ease: "easeOut" },
      }}
      style={{
        borderStyle: "solid",
        borderRadius: "12px",
      }}
    >
      <div className="flex flex-col gap-7">
        <div className="flex justify-between text-white">
          <p>0 TH/s</p>
          <p>100000 TH/s</p>
        </div>
        <input
          type="range"
          min={0}
          max={100000}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            ...getBackgroundStyle(),
            width: "100%",
            height: "12px",
            borderRadius: "5px",
            outline: "none",
            appearance: "none",
          }}
          className="w-full"
        />
        <p className="text-[#1ECBAF] text-center">{value} TH/s</p>
        <div>
          <p className="mb-2">Your Hashrate</p>
          <div className="flex w-full">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="bg-[#0194FE61] grow h-10 p-2 rounded-s-lg border-0 outline-none"
            />
            <p className="bg-[#07EAD3] p-2 rounded-e-lg">TH/s</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <p className="text-[#1ECBAF]">Daily est. coins </p>
            <p>0.0001 BTC</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[#1ECBAF]">Daily est. earnings </p>
            <p>4.34 USD</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
