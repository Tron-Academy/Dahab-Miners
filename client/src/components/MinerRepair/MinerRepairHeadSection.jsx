import React from "react";
import bg from "../../assets/minerRepair.svg";

export default function MinerRepairHeadSection({ scrollfunction }) {
  return (
    <div
      className="px-5 md:px-10 xl:px-[120px] py-10 bg-no-repeat bg-center min-h-[640px] bg-homeBg flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
      }}
    >
      <div className="max-w-[970px] flex flex-col gap-10 justify-center items-center">
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
          className="text-lg font-semibold bg-[#1ECBAF] px-10 py-3 text-white rounded-lg hover:bg-btnHover nav-link"
        >
          View Pricing
        </button>
      </div>
    </div>
  );
}
