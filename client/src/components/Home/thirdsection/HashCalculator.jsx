import React, { useEffect, useState } from "react";
import useGetBitCoinData from "../../../hooks/coins/useGetBitCoinData";
import { coinsPerDay, dailyEarnings } from "../../../utils/BTCCalculator";

export default function HashCalculator({ btcData }) {
  const [value, setValue] = useState(0);

  const [coins, setCoins] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const calculateFunction = () => {
    const dailyCoins = coinsPerDay(
      value,
      btcData[0].difficulty,
      btcData[0].reward_block
    );
    const erngs = dailyEarnings(dailyCoins, btcData[0].price);
    setCoins(dailyCoins);
    setEarnings(erngs);
  };

  const getBackgroundStyle = () => {
    const percentage = (value / 100000) * 100;
    return {
      background: `linear-gradient(to right, #1ECBAF  ${percentage}%, #1ECBAF59 ${percentage}%)`,
    };
  };
  return (
    <div className="p-5 relative sm:px-[100px] text-white my-10 rounded-lg customborder">
      <div className="flex flex-col gap-7">
        <div className="flex justify-between text-white">
          <p>0 TH/s</p>
          <p>100000 TH/s</p>
        </div>
        <input
          type="range"
          min={0}
          max={100000}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            ...getBackgroundStyle(),
            width: "100%",
            height: "12px",
            borderRadius: "5px",
            outline: "none",
            appearance: "none",
          }}
          className="w-full"
        />
        <p className="text-[#1ECBAF] text-center">{value} TH/s</p>
        <div>
          <p className="mb-2">Your Hashrate</p>
          <div className="flex sm:flex-row flex-col gap-2 items-center">
            <div className="flex w-full">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-[#0194FE61] grow h-10 p-2 rounded-s-lg border-0 outline-none"
              />
              <p className="bg-[#0194FE61] text-[#3CD6E9] p-2 rounded-e-lg">
                TH/s
              </p>
            </div>
            <button
              className="p-2 btn-bg rounded-md px-5 sm:w-fit w-full"
              onClick={calculateFunction}
            >
              Calculate
            </button>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col justify-center sm:gap-20 gap-5 items-center">
          <div className="flex flex-col items-center">
            <p className="">Daily est. coins </p>
            <p className="text-[#1ECBAF] text-2xl font-semibold">
              {coins.toFixed(10)} BTC
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="">Daily est. earnings </p>
            <p className="text-[#1ECBAF] text-2xl font-semibold">
              {earnings.toFixed(5)} USD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
