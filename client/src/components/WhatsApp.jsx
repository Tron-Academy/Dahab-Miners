import React from "react";
import { handleChatClick } from "../utils/whatsapp";

const WhatsApp = () => {
  return (
    <div
      className="w-14 h-14  rounded-xl overflow-hidden cursor-pointer fixed right-3 bottom-3"
      onClick={handleChatClick}
    >
      <img src="/whatsapp_logo.png" alt="" />
    </div>
  );
};

export default WhatsApp;
