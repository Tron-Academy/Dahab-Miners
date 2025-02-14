import React from "react";
import { handleChatClick } from "../../utils/whatsapp";

export default function ContactButtonSection() {
  return (
    <div className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10">
      <div className="p-5 px-10 customborder flex md:flex-row flex-col gap-5 justify-around items-center">
        <div className="max-w-[400px]">
          <h5 className="text-[#0194FE] text-3xl font-semibold md:text-left text-center">
            Ready to Start Mining?
          </h5>
          <p className="text-white md:text-left text-center">
            Whether you need a miner, hosting, or expert guidance, we’re here to
            help. Let’s get you mining today!
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
