import React from "react";

export default function ProfitViewer() {
  return (
    <div className="w-full bg-white xl:bg-gradient-to-r from-profitYellow2 from-50% to-profitYellow1 to-50% flex justify-around rounded-lg items-center shadow-2xl shadow-gray-400 p-5">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h4 className="text-sm lg:text-2xl font-semibold">Purchase BTC</h4>
          <h4 className="text-base lg:text-[28px] font-bold">57,765 BTC</h4>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-sm lg:text-2xl font-semibold">
            Direct BTC Quality
          </h4>
          <h4 className="text-base lg:text-[28px] font-bold">0.12118046 BTC</h4>
        </div>
      </div>
      <div className=" w-14 h-14 p-2 bg-white xl:block hidden rounded-full overflow-hidden absolute">
        <img src="/mainlogo2.png"></img>
      </div>
      <div className="flex flex-col items-end gap-10">
        <div className="flex flex-col gap-3 items-end">
          <h4 className="text-sm lg:text-2xl font-semibold">Mining BTC</h4>
          <h4 className="text-base lg:text-[28px] font-bold text-[#1ECBAF] xl:text-white">
            45,889.53 USD
          </h4>
        </div>
        <div className="flex flex-col gap-3 items-end">
          <h4 className="text-sm lg:text-2xl font-semibold">
            cloud mining BTC
          </h4>
          <h4 className="text-base flex lg:flex-row flex-col gap-3 items-end lg:items-center lg:text-[28px] font-bold text-[#1ECBAF] xl:text-white">
            0.14323456 BTC{" "}
            <span className="text-sm lg:text-xl font-semibold bg-btnGreen text-white rounded-xl p-1">
              +14.89%
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}
