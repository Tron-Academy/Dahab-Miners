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
    <div className="bg-white rounded-lg p-5 h-[320px] flex flex-col justify-between">
      <div>
        <motion.div
          variants={animationVariants}
          animate="animate"
          className="text-2xl font-semibold w-10 h-10 rounded-lg bg-btnGreen text-white flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </div>
      <div className="text-lg font-semibold leading-7">{content}</div>
    </div>
  );
}
