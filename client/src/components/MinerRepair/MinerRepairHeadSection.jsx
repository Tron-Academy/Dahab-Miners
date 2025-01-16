import React from "react";

export default function MinerRepairHeadSection({ scrollfunction }) {
  return (
    <div className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 min-h-[640px] flex justify-center items-center ">
      <div className="max-w-[970px] flex flex-col gap-10 justify-center items-center relative">
        <h1 className="text-4xl lg:text-5xl font-semibold gradient-heading max-w-[850px] text-center">
          Premier Bitcoin ASIC Miner Repair Services
        </h1>
        <p className="text-base lg:text-xl font-normal leading-8 text-white text-center">
          Trust the Experts at Dahab Miners to Keep Your Mining Operations
          Running Smoothly. Our Dedicated Team Ensures Fast, Reliable Repairs
          for Optimal Performance and Minimal Downtime. Count on Us to Bring
          Your ASIC Miners Back Online Efficiently and Effectively.
        </p>
        <button
          onClick={scrollfunction}
          className="text-lg font-semibold btn-bg px-10 py-3 text-white rounded-full"
        >
          View Pricing
        </button>
        <img
          src="/repair/bg.png"
          className="absolute md:-top-56 md:right-10 md:w-fit w-screen right-5 bottom-52"
        />
      </div>
    </div>
  );
}
