import React from "react";
import { handleChatClick } from "../../utils/whatsapp";

export default function ContactButtonSection() {
  return (
    <div className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10">
      <div className="p-5 px-10 customborder flex justify-around items-center">
        <div className="max-w-[400px]">
          <h5 className="text-[#0194FE] text-3xl font-semibold">
            Do you want to start mining?
          </h5>
          <p className="text-white">
            No matter what questions or concerns you have, we are happy to help.
          </p>
        </div>
        <div>
          <button
            className="px-10 py-2 btn-bg rounded-full text-white "
            onClick={() => handleChatClick()}
          >
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
}
