import React, { useState } from "react";
import DescriptionBox from "../Home/mapsection/DescriptionBox";
import { handleChatClick } from "../../utils/whatsapp";

export default function EthiopiaLanding() {
  const [isHover1, setIsHover1] = useState(false);
  return (
    <div className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 min-h-[640px] flex md:flex-row flex-col gap-5 justify-between items-center">
      <div className="flex flex-col md:items-start items-center gap-5 max-w-[620px] animate-slideInLeft">
        <h4 className="text-[40px] gradient-heading font-semibold md:text-left text-center">
          Bitcoin Mining in Ethiopia
        </h4>
        <p className="md:text-left text-center">
          Crypto Mining in Ethiopia<br></br> Take advantage of Ethiopia’s
          low-cost electricity and secure mining infrastructure. Buy a crypto
          mining machine today and start mining with maximum profitability.
          <br></br>With expert support and a seamless setup process, your mining
          success is just a step away. Get started now.
        </p>
        <button
          className="px-4 py-2 rounded-full btn-bg w-fit"
          onClick={() => handleChatClick()}
        >
          Know More
        </button>
      </div>
      <div className="relative animate-slideInRight">
        <img src="/host/map.png" />
        <img
          src="/host/location.png"
          className="absolute w-3 right-[39%] bottom-[38%] cursor-pointer"
          onMouseEnter={() => setIsHover1(true)}
          onMouseLeave={() => setIsHover1(false)}
        />
        {isHover1 && (
          <DescriptionBox
            flag={"/home/ethiopia.png"}
            place={"ETHIOPIA"}
            amt={"$56,623.54"}
            position={"right-[22%] bottom-[15%] bg-white"}
          />
        )}
      </div>
    </div>
  );
}
