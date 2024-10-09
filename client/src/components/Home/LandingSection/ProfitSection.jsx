import React from "react";
import { BiSolidMinusSquare, BiSolidPlusSquare } from "react-icons/bi";
import ProfitViewer from "./ProfitViewer";

export default function ProfitSection() {
  return (
    <div className="bg-gradient-to-b from-homeBg from-50% to-homeBgGradient px-5 md:px-10 lg:px-[120px] py-10">
      <h4 className="text-[40px] gradient-heading font-semibold text-center">
        Calculate your bitcoin mining profit
      </h4>
      <div className="xl:bg-white rounded-lg flex flex-col w-4/5 my-10 mx-auto p-5 py-10">
        <div className="flex xl:flex-row flex-col justify-between gap-10 w-full">
          <div className="flex flex-col gap-5 w-full xl:p-5">
            <h4 className="text-xl xl:block hidden font-semibold px-5">
              Estimated Investment
            </h4>
            <div className="bg-white xl:bg-inherit flex justify-between items-center w-full rounded-lg py-3 px-5">
              <span className="text-4xl text-btnGreen">
                <BiSolidMinusSquare />
              </span>
              <span className="text-xl font-semibold">5000</span>
              <span className="text-4xl text-btnGreen">
                <BiSolidPlusSquare />
              </span>
            </div>
          </div>
          <div className="bg-white xl:bg-inherit w-full flex xl:flex-row flex-col gap-10 justify-between rounded-lg py-3 px-5">
            <div className="flex flex-col justify-center items-center gap-2 xl:gap-5">
              <h4 className="text-base font-semibold">More from mining</h4>
              <p className="text-2xl font-semibold">
                <span className="text-btnGreen">0.01898779</span> BTC
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 xl:gap-5">
              <h4 className="text-base font-semibold">Save For You</h4>
              <p className="text-2xl font-semibold">
                <span className="text-btnGreen">1270.80 USD</span> BTC
              </p>
            </div>
          </div>
        </div>
        <div className="w-full my-10">
          <ProfitViewer />
        </div>
      </div>
    </div>
  );
}
