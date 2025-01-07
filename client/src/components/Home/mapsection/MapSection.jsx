import React, { useState } from "react";
import DescriptionBox from "./DescriptionBox";

function MapSection() {
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 text-white flex items-center justify-between">
      <div className="flex flex-col gap-10 max-w-[450px]">
        <h4 className="text-[40px] gradient-heading font-semibold">
          Strategic key locations
        </h4>
        <p className="text-sm max-w-[350px]">
          We are operating through mining farms in strategic locations around
          the world
        </p>
        <div className="flex gap-3 items-center">
          <button className="px-4 py-2 rounded-lg bg-[#0194FE] hover:bg-[#52aced] hover:scale-110 ease-in-out duration-500 hover:shadow-lg hover:shadow-[#0194FE]">
            UAE
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#051D2E] text-[#1994B0] hover:scale-110 ease-in-out duration-500 hover:shadow-lg hover:shadow-[#1994B0]">
            ETHIOPIA
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#0194FE] text-4xl font-semibold">32K+</p>
            <p className="text-sm">People Joined</p>
          </div>
          <div>
            <p className="text-[#0194FE] text-4xl font-semibold">250+</p>
            <p className="text-sm">Users</p>
          </div>
          <div>
            <p className="text-[#0194FE] text-4xl font-semibold">87+</p>
            <p className="text-sm">Big Company</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <img src="/home/map.png" />
        <img
          className="absolute right-[42%] bottom-[45%] z-10"
          src="/home/location-1.png"
          onMouseEnter={() => setIsHover2(true)}
          onMouseLeave={() => setIsHover2(false)}
        />
        <img
          className="absolute right-[38%] top-[33%]"
          src="/home/location-2.png"
          onMouseEnter={() => setIsHover1(true)}
          onMouseLeave={() => setIsHover1(false)}
        />
        {isHover1 && (
          <DescriptionBox
            flag={"/home/uae.png"}
            place={"UAE"}
            amt={"$56,623.54"}
            position={"right-[18%] top-[18%] bg-[#07EAD3]"}
          />
        )}
        {isHover2 && (
          <DescriptionBox
            flag={"/home/ethiopia.png"}
            place={"ETHIOPIA"}
            amt={"$56,623.54"}
            position={"right-[22%] bottom-[30%] bg-white"}
          />
        )}
      </div>
    </section>
  );
}

export default MapSection;
