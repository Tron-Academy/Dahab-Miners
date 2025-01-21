import React, { useState } from "react";
import useGetBitCoinData from "../../../hooks/coins/useGetBitCoinData";
import { useSelector } from "react-redux";
import { bitcoinBought, coinsPerDay } from "../../../utils/BTCCalculator";

export default function Calculator() {
  const {
    btcData2: btcData,
    difficulty,
    block_reward,
  } = useSelector((state) => state.user);
  const [investment, setInvestment] = useState();
  const [priceAfterOneYear, setPriceAfterOneYear] = useState();
  const [btcBought, setBtcBought] = useState(0);
  const [btcOwned1, setBtcOwned1] = useState(0);
  const [hashBought, setHashBought] = useState(0);
  const [btcOwned2, setBtcOwned2] = useState(0);
  const [profit1, setProfit1] = useState(0);
  const [profit2, setProfit2] = useState(0);

  function handleCalculate() {
    const data1 = investment / btcData[0]?.current_price;
    setBtcBought(data1);
    setBtcOwned1(data1 * priceAfterOneYear);
    const data2 = investment / 15;
    setHashBought(data2);
    const data3 =
      coinsPerDay(data2, difficulty, block_reward) * 365 * priceAfterOneYear;
    setBtcOwned2(data3);
    setProfit1(data1 * priceAfterOneYear - investment);
    setProfit2(data3 - 500 - investment);
  }

  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120] xl:px-[180px] py-10 flex flex-col gap-10">
      <h4 className="gradient-heading text-[40px] font-semibold text-center">
        Calculate Your Bitcoin Mining Profit
      </h4>
      <div className="flex sm:flex-row flex-col justify-center gap-5">
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(parseFloat(e.target.value))}
          className="border border-[#76C6E0CC] outline-none bg-[#013E72] rounded-md px-2 py-2 text-sm h-10 sm:w-[320px] w-full"
          placeholder="Enter Your investment"
          required
        />
        <input
          type="number"
          value={priceAfterOneYear}
          onChange={(e) => setPriceAfterOneYear(parseFloat(e.target.value))}
          className="border border-[#76C6E0CC] outline-none bg-[#013E72] rounded-md px-2 py-2 text-sm h-10 sm:w-[320px] w-full"
          placeholder="Price after 1 year"
          required
        />
        <button
          className="btn-bg px-5 py-2 rounded-xl"
          onClick={handleCalculate}
        >
          CALCULATE
        </button>
      </div>
      <div className="customborder p-10 ">
        <div className="flex lg:flex-row flex-col lg:items-start items-center justify-around text-white">
          <div className="flex flex-col gap-10 lg:w-fit w-full">
            <p className="text-[#07EAD3] text-center">TRADING BTC</p>
            <div className="text-sm flex flex-col gap-2 lg:w-[320px]">
              <div className="flex justify-between grow">
                <p>Price of Bitcoin</p>
                <p>{btcData && btcData[0]?.current_price.toFixed(2)} $</p>
              </div>
              <div className="flex justify-between">
                <p>BTC bought</p>
                <p>{btcBought.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-sm flex flex-col gap-2 lg:w-[320px]">
              <div className="flex justify-between border-b border-[#19AEFB] py-2 text-[#97E1FB]">
                <p>After 1 Year Bitcoin Value</p>
                <p>{priceAfterOneYear ? priceAfterOneYear : 0} $</p>
              </div>
              <div className="flex justify-between">
                <p>Value of BTC Owned</p>
                <p>{btcOwned1.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#97E1FB]">Profit while trading</p>
                <p className="text-xl font-semibold text-[#97E1FB]">
                  {profit1.toFixed(2)}$
                </p>
              </div>
            </div>
          </div>
          <img
            src="/home/roundlogo.png"
            alt="logo of dahab miners"
            className="self-center"
          />
          <div className="flex flex-col gap-10 lg:w-fit w-full">
            <p className="text-[#07EAD3] text-center">MINING BTC</p>
            <div className="text-sm flex flex-col gap-2 lg:w-[320px]">
              <div className="flex justify-between">
                <p>Price of Bitcoin</p>
                <p>{btcData && btcData[0]?.current_price.toFixed(2)} $</p>
              </div>
              <div className="flex justify-between">
                <p>Hashrate bought</p>
                <p>{hashBought.toFixed(2)}Th/s</p>
              </div>
              <div className="flex justify-between">
                <p>Hosting charge for 1 year</p>
                <p>500$</p>
              </div>
            </div>
            <div className="text-sm flex flex-col gap-2 lg:w-[320px]">
              <div className="flex justify-between border-b border-[#19AEFB] py-2 text-[#97E1FB]">
                <p>After 1 Year Bitcoin Value</p>
                <p>{priceAfterOneYear ? priceAfterOneYear : 0} $</p>
              </div>
              <div className="flex justify-between">
                <p>Value of BTC owned</p>
                <p>{btcOwned2.toFixed(2)}$</p>
              </div>
              <div className="flex justify-between">
                <p>Gross value of BTC owned</p>
                <p>{btcOwned2 === 0 ? 0 : (btcOwned2 - 500).toFixed(2)}$</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#97E1FB]">Profit while mining</p>
                <p className="text-xl font-semibold text-[#97E1FB]">
                  {profit2.toFixed(2)}$
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
