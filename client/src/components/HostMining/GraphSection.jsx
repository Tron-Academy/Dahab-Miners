import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";

export default function GraphSection() {
  return (
    <div className="bg-gradient-to-b from-homeBg to-[#2a4894] px-5 md:px-10 xl:px-[120px] py-10">
      <h1 className="gradient-heading text-3xl lg:text-4xl font-semibold py-5 text-center">
        Why DAHAB Hosting
      </h1>
      <div className="flex lg:flex-row flex-col items-center lg:items-start gap-10 justify-between my-10">
        <div className="flex text-white flex-col gap-5 items-center max-w-[360px]">
          <div className="w-12 h-12 rounded-full bg-[#1CCBAF] flex justify-center items-center text-2xl">
            <CiLocationOn />
          </div>
          <h3 className="text-base font-bold text-[#1CCBAF]">
            Prime Locations in UAE
          </h3>
          <p className="text-base font-medium leading-6">
            All cryptocurrency mining hosting is located in the UAE, offering
            legal security, reliable grid electricity, and strong internet
            connections. We have miner hosting sites in the UAE ready to
            accommodate your miners.
          </p>
        </div>
        <div className="flex text-white flex-col gap-5 items-center max-w-[360px]">
          <div className="w-12 h-12 rounded-full bg-[#1CCBAF] flex justify-center items-center text-2xl">
            <FaArrowTrendUp />
          </div>
          <h3 className="text-base font-bold text-[#1CCBAF]">
            Full-Service Hosting
          </h3>
          <p className="text-base font-medium leading-6">
            We maintain an active helpdesk that responds within 24 hours,
            continuously striving to offer you superior service.
          </p>
        </div>
        <div className="flex text-white flex-col gap-5 items-center max-w-[360px]">
          <div className="w-12 h-12 rounded-full bg-[#1CCBAF] flex justify-center items-center text-2xl">
            <BsLightningCharge />
          </div>
          <h3 className="text-base font-bold text-[#1CCBAF]">
            Competitive Pricing
          </h3>
          <p className="text-base font-medium leading-6">
            Our partners offer all-in-one ASIC hosting costs, covering
            placement, electricity, insurance, maintenance, and helpdesk support
            per kWh. Short-term contracts range from single miners to
            installations over 5000kW.
          </p>
        </div>
      </div>
    </div>
  );
}
