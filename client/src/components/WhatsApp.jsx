import React from "react";
import { handleChatClick } from "../utils/whatsapp";
import { motion } from "framer-motion";

const WhatsApp = () => {
  return (
    <div className="flex items-center gap-3 fixed right-3 bottom-3">
      <div className="px-4 py-4 rounded-s-full rounded-e-full bg-[#CCF2FF] text-black text-xs font-semibold md:block hidden">
        Questions? We’re here—connect anytime!
      </div>
      <motion.button
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }} // Change color on hover
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }} // Smooth animation
        className="w-14 h-14  rounded-xl overflow-hidden cursor-pointer"
        onClick={handleChatClick}
      >
        <img src="/whatsapp_logo.webp" alt="Bitcoin Mining in Dubai" />
      </motion.button>
    </div>
  );
};

export default WhatsApp;
