import React, { useState } from "react";
import DescriptionBox from "../Home/mapsection/DescriptionBox";

export default function EthiopiaLanding() {
  const [isHover1, setIsHover1] = useState(false);
  return (
    <div className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 min-h-[640px] flex md:flex-row flex-col gap-5 justify-between items-center">
      <div className="flex flex-col md:items-start items-center gap-5 max-w-[620px]">
        <h4 className="text-[40px] gradient-heading font-semibold md:text-left text-center">
          Bitcoin mining in Ethiopia
        </h4>
        <p className="md:text-left text-center">
          Crypto Mining in Ethiopia Buy a crypto mining machine today and step
          into the future of crypto mining. With expert support, your success is
          just a step away. Shop now
        </p>
        <button className="px-4 py-2 rounded-full btn-bg w-fit">
          Know More
        </button>
      </div>
      <div className="relative">
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
