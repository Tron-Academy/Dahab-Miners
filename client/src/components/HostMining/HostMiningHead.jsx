import React, { useState } from "react";
import { handleChatClick } from "../../utils/whatsapp";
import DescriptionBox from "../Home/mapsection/DescriptionBox";
export default function HostMiningHead() {
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10  min-h-[640px] main-bg flex lg:flex-row flex-col gap-5 justify-between items-center">
      <div className="flex flex-col lg:items-start items-center lg:text-left text-center gap-10 max-w-[620px] animate-slideInLeft">
        <h1 className="text-4xl lg:text-5xl font-semibold gradient-heading">
          Secure and Affordable Mining Hosting with DAHAB Miners
        </h1>
        <p className="text-base font-light text-white">
          Host your ASIC miners at UAE or Ethiopia, in our state-of-the-art
          facilities designed for optimal performance. With affordable rates,
          reliable infrastructure, and near-zero downtime, we ensure your mining
          operations run smoothly and profitably.
        </p>
        <button
          onClick={handleChatClick}
          className="text-base font-semibold px-4 py-3 btn-bg w-fit nav-link rounded-lg text-white"
        >
          View Prices
        </button>
      </div>
      <div className="relative animate-slideInRight">
        <img src="/host/map.png" className="" />
        <img
          src="/host/location.png"
          className="absolute w-3 right-[39%] bottom-[38%] cursor-pointer"
          onMouseEnter={() => setIsHover1(true)}
          onMouseLeave={() => setIsHover1(false)}
        />
        <img
          src="/host/location.png"
          className="absolute w-3 right-[36%] top-[49%] cursor-pointer"
          onMouseEnter={() => setIsHover2(true)}
          onMouseLeave={() => setIsHover2(false)}
        />
        {isHover1 && (
          <DescriptionBox
            flag={"/home/ethiopia.png"}
            place={"ETHIOPIA"}
            amt={"$56,623.54"}
            position={"right-[22%] bottom-[15%] bg-white"}
          />
        )}
        {isHover2 && (
          <DescriptionBox
            flag={"/home/uae.png"}
            place={"UAE"}
            amt={"$56,623.54"}
            position={"right-[18%] top-[24%] bg-[#07EAD3]"}
          />
        )}
      </div>
    </section>
  );
}
