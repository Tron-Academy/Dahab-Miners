import React from "react";
import { handleProductEnquiry } from "../../../utils/whatsapp";
import { HiOutlineCube } from "react-icons/hi2";
import { PiLightning } from "react-icons/pi";
import { GoCpu } from "react-icons/go";

export default function FeaturedCard({
  img,
  name,
  desc,
  hash,
  power,
  algorithm,
}) {
  return (
    <div className="flex md:flex-row flex-col my-10 justify-center gap-40 items-center">
      <div className="w-full max-w-[400px] h-auto md:max-w-[350px] overflow-hidden">
        <img
          src={img}
          alt="Find-top-asic-miner-models-in-abu-dhabi-UAE-here"
          title="Dahab Miners is your trusted partner for crypto mining in UAE, offering a diverse array of advanced ASIC miners in Abu Dhabi. Discover our premium CRYPTO MINING MACHINES IN UAE and optimize your mining operations with the best tools available."
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="max-w-[488px] flex flex-col gap-7">
        <h4 className="text-2xl font-semibold">{name}</h4>
        <p className="text-base font-normal">{desc}</p>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 bg-gray-200 rounded-full text-xl text-gray-400 flex justify-center items-center">
              <GoCpu />
            </div>
            <span className="text-sm font-normal">HashRate</span>
            <span className="text-lg font-medium">{hash}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 bg-gray-200 rounded-full text-xl text-gray-400 flex justify-center items-center">
              <PiLightning />
            </div>
            <span className="text-sm font-normal">Power</span>
            <span className="text-lg font-medium">{power} Watts</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 bg-gray-200 rounded-full text-xl text-gray-400 flex justify-center items-center">
              <HiOutlineCube />
            </div>
            <span className="text-sm font-normal">Algorithm</span>
            <span className="text-lg font-medium">{algorithm}</span>
          </div>
        </div>
        <div className="text-lg font-semibold flex justify-between items-center">
          <button
            className="bg-btnGreen text-white px-10 hover:bg-btnHover nav-link py-3 rounded-lg"
            onClick={() => handleProductEnquiry({ name })}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
