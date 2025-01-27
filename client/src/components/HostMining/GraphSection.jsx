import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";

export default function GraphSection() {
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10">
      <h1 className="gradient-heading text-3xl lg:text-4xl font-semibold py-5 text-center z-[1]">
        Why Choose DAHAB Hosting
      </h1>
      <div className="flex lg:flex-row flex-col items-center lg:items-start gap-10 justify-between my-10">
        <div className="flex text-white flex-col gap-5 items-center max-w-[360px]">
          <div className="w-12 h-12 rounded-full btn-bg flex justify-center items-center text-2xl">
            <CiLocationOn />
          </div>
          <h3 className="text-base font-bold text-[#1CCBAF]">
            Strategic Locations
          </h3>
          <p className="text-base font-medium text-center leading-6">
            Our hosting facilities are located in prime regions, offering,
            affordable electricity, security, reliable power supply, and fast
            internet connectivity for seamless operations.
          </p>
        </div>
        <div className="flex text-white flex-col gap-5 items-center max-w-[360px]">
          <div className="w-12 h-12 rounded-full btn-bg flex justify-center items-center text-2xl">
            <FaArrowTrendUp />
          </div>
          <h3 className="text-base font-bold text-[#1CCBAF]">
            Full-Service Hosting
          </h3>
          <p className="text-base font-medium leading-6 text-center">
            From 24/7 support to maintenance, we handle everything to ensure
            your miners run efficiently and profitably. Focus on mining while we
            take care of the rest.
          </p>
        </div>
        <div className="flex text-white flex-col gap-5 items-center max-w-[360px]">
          <div className="w-12 h-12 rounded-full btn-bg flex justify-center items-center text-2xl">
            <BsLightningCharge />
          </div>
          <h3 className="text-base font-bold text-[#1CCBAF]">
            Affordable Pricing
          </h3>
          <p className="text-base font-medium text-center leading-6">
            Enjoy competitive, all-inclusive hosting rates that cover
            electricity, maintenance, and support. Flexible options cater to
            setups from individual miners to large-scale operations.
          </p>
        </div>
      </div>
    </section>
  );
}
