import React, { useState } from "react";
import DescriptionBox from "../Home/mapsection/DescriptionBox";
import { handleChatClick } from "../../utils/whatsapp";

export default function AbudhabiLanding() {
  const [isHover2, setIsHover2] = useState(false);
  return (
    <div className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 min-h-[640px] flex md:flex-row flex-col gap-5 justify-between items-center ">
      <div className="flex flex-col md:items-start items-center gap-5 max-w-[620px] animate-slideInLeft">
        <h4 className="text-[40px] gradient-heading font-semibold md:text-left text-center">
          Bitcoin mining in AbuDhabi
        </h4>
        <p className="md:text-left text-center">
          Buy a crypto mining machine today and step into the future of crypto
          mining. With expert support, your success is just a step away. Shop
          now
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
          className="absolute w-3 right-[36%] top-[49%] cursor-pointer"
          onMouseEnter={() => setIsHover2(true)}
          onMouseLeave={() => setIsHover2(false)}
        />
        {isHover2 && (
          <DescriptionBox
            flag={"/home/uae.png"}
            place={"UAE"}
            amt={"$56,623.54"}
            position={"right-[18%] top-[24%] bg-[#07EAD3]"}
          />
        )}
      </div>
    </div>
  );
}
