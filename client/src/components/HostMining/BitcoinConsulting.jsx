import React from "react";
import { handleChatClick } from "../../utils/whatsapp";

export default function BitcoinConsulting() {
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex flex-col items-center gap-5 ">
      <h5 className="gradient-heading text-[40px] font-semibold text-center">
        Bitcoin Mining Consulting
      </h5>
      <p className="text-white max-w-[450px] text-center">
        Your needs always come first in our customer-centric advice. An excerpt
        of our consulting areas.
      </p>
      <div className="p-5 py-10 customborder flex md:flex-row flex-col gap-7 items-center justify-around w-full">
        <div className="text-white flex flex-col md:items-start items-center gap-5">
          <div className="flex gap-5 items-center">
            <img src="/host/icon-1.png" className="w-5" />
            <p>Purchasing advice</p>
          </div>
          <div className="flex gap-5 items-center">
            <img src="/host/icon-2.png" className="w-5" />
            <p>Bitcoin Mining</p>
          </div>
          <div className="flex gap-5 items-center">
            <img src="/host/icon-3.png" className="w-5" />
            <p>Investing In Bitcoin</p>
          </div>
          <div className="flex gap-5 items-center">
            <img src="/host/icon-4.png" className="w-5" />
            <p>Workshops & Training</p>
          </div>
          <button
            className="px-4 py-2 rounded-full btn-bg"
            onClick={() => handleChatClick()}
          >
            Know More
          </button>
        </div>
        <img src="/home/repair2.webp" className="max-w-[400px] rounded-lg" />
      </div>
    </section>
  );
}
