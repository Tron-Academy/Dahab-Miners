import React from "react";
import svgbg from "../../../assets/homebg.svg";

import PgBar from "./PbBar";
import CarouselNavigation from "./CarouselNavigation";
import { handleChatClick } from "../../../utils/whatsapp";
export default function RepairCarousel({ setItem, item }) {
  return (
    <>
      <PgBar repair setItem={setItem} />
      <div className="flex lg:flex-row flex-col justify-between items-center pt-28 pb-10 w-full -mt-20">
        <div className="flex flex-col lg:items-start items-center lg:text-left text-center gap-10 max-w-[678px] animate-slideInLeft">
          <div>
            <h4 className="text-5xl my-3 font-semibold leading-[60px] text-btnGreen">
              <a href="https://dahabminers.com/">
                ASIC Miner in Abu Dhabi, UAE
              </a>
            </h4>
            <h4 className="text-5xl font-semibold text-btnGreen">
              Repair Services
            </h4>
          </div>
          <h4 className="text-base font-light text-white leading-6 tracking-wider">
            Get your crypto mining gear back in action fast. Optimise your
            cryptocurrency mining machine operations with our rapid repair &
            maintenance service.
            <br></br>
            Ensure expert care for your equipment.
          </h4>
          <button
            className="text-base font-semibold text-white bg-btnGreen hover:bg-btnHover nav-link px-5 py-3 w-fit rounded-lg"
            onClick={handleChatClick}
          >
            View Prices
          </button>
          <div className="w-full">
            <CarouselNavigation setItem={setItem} item={item} />
          </div>
        </div>

        <div className="w-[315px] h-[244px] md:w-[600px] md:h-[465px] z-10 animate-slideInRight">
          <img
            className=""
            src="/repaircarouselimage.png"
            alt="Essential-tools-for-crypto-mining-machines-in-abu-dhabi-UAE"
            title="Explore top-tier CRYPTO MINING MACHINES IN UAE at Dahab Miners. Specializing in high-efficiency ASIC miners in Abu Dhabi, UAE, we offer the best solutions for crypto mining in UAE. Browse our range today and enhance your mining setup!"
          ></img>
        </div>
        <img
          className="absolute right-0 top-0 hidden lg:block"
          src={svgbg}
          alt="Essential-tools-for-crypto-mining-machines-in-abu-dhabi-UAE"
          title="Explore top-tier CRYPTO MINING MACHINES IN UAE at Dahab Miners. Specializing in high-efficiency ASIC miners in Abu Dhabi, UAE, we offer the best solutions for crypto mining in UAE. Browse our range today and enhance your mining setup!"
        ></img>
      </div>
    </>
  );
}
