import React from "react";
import bg from "../../assets/hostminer.svg";
import { AiOutlineEuro } from "react-icons/ai";
import { TbCurrencyEuro } from "react-icons/tb";
import { FaLeaf } from "react-icons/fa";
import { handleChatClick } from "../../utils/whatsapp";
export default function HostMiningHead() {
  return (
    <div
      className="px-5 md:px-10 lg:px-[120px] py-10 bg-no-repeat lg:bg-contain bg-cover lg:bg-center bg-center min-h-[640px] bg-homeBg flex lg:flex-row flex-col justify-around items-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="flex flex-col lg:items-start items-center lg:text-left text-center gap-10 max-w-[620px]">
        <h1 className="text-4xl lg:text-5xl font-semibold gradient-heading">
          Affordable Mining Hosting with DAHAB Miners
        </h1>
        <p className="text-base font-light text-white">
          Need a top-notch hosting location for your ASIC miners? DAHAB Miners
          provides the best and most affordable options in our modern hosting
          farms.
        </p>
        <button
          onClick={handleChatClick}
          className="text-base font-semibold px-4 py-3 bg-btnGreen w-fit hover:bg-btnHover nav-link rounded-lg text-white"
        >
          View Prices
        </button>
      </div>
      <div className="">
        <div className="bg-white p-3 rounded-lg flex flex-col gap-5 text-sm font-medium  top-0 left-0">
          <p className="flex gap-1 items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src="/uaeflag.png"></img>{" "}
            </div>
            UAE
          </p>
          <p className="flex gap-1 items-center">
            <p>
              <AiOutlineEuro />
            </p>
            0.065-0.08
            <span>
              <TbCurrencyEuro />
            </span>
            /Kwh
          </p>
          <p className="flex gap-1 items-center text-green-700">
            <p>
              <FaLeaf />
            </p>
            100% renewable Energy
          </p>
        </div>
      </div>
    </div>
  );
}
