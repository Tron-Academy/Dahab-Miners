import React from "react";
import { handleChatClick } from "../../../utils/whatsapp";

const EnquireButton = () => {
  return (
    <div>
      <button
        className="bg-btnGreen hover:bg-btnHover text-white rounded-lg px-4 py-2 transform rotate-90 fixed right-5 bottom-20 -translate-y-1/2 origin-top-right"
        onClick={handleChatClick}
      >
        ENQUIRE
      </button>
    </div>
  );
};

export default EnquireButton;
