import React from "react";
import { handleChatClick } from "../utils/whatsapp";
import { motion } from "framer-motion";

const WhatsApp = () => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }} // Change color on hover
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }} // Smooth animation
      className="w-14 h-14  rounded-xl overflow-hidden cursor-pointer fixed right-3 bottom-3"
      onClick={handleChatClick}
    >
      <img src="/whatsapp_logo.webp" alt="" />
    </motion.div>
  );
};

export default WhatsApp;
