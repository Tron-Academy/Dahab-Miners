import { motion } from "framer-motion";
import React from "react";

export default function HardwareReviewCard({ icon, content }) {
  const animationVariants = {
    animate: {
      scale: [1, 1.2, 1, 1], // Pop out and back in
      rotate: [0, -5, 5, -5, 0], // Shake
      transition: {
        scale: {
          duration: 1.2,
          repeat: Infinity,
          repeatType: "loop",
        },
        rotate: {
          duration: 0.5,
        },
      },
    },
  };

  return (
    <motion.div
      className="bg-[#000618] text-white rounded-lg p-5 flex flex-col gap-5"
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
        <motion.div
          variants={animationVariants}
          animate="animate"
          className="text-2xl font-semibold w-10 h-10 rounded-lg bg-btnGreen text-white flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </div>
      <div className="text-sm font-semibold leading-7">{content}</div>
    </motion.div>
  );
}
