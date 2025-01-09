import { motion } from "framer-motion";
import React from "react";

export default function FacilityCard({ title, content, image }) {
  return (
    <motion.div
      className="flex xl:flex-row flex-col gap-5 items-center justify-between bg-[#000618] p-5 rounded-lg border max-w-[500px]"
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
      <div>
        <p className="text-2xl gradient-heading xl:text-left text-center">
          {title}
        </p>
        <p className="text-[#11639D] text-sm xl:text-left text-center">
          {content}
        </p>
      </div>
      <img
        src={image}
        className="w-[200px] object-cover"
        alt="Cutting-edge-technology-in-crypto-mining-machines-in-abu-dhabi-UAE"
        title="Looking for reliable crypto mining solutions in UAE? Dahab Miners provides cutting-edge ASIC miners in Abu Dhabi, perfect for beginners and pros alike. Check out our CRYPTO MINING MACHINES IN UAE and start mining efficiently today!"
      ></img>
    </motion.div>
  );
}
