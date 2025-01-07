import React from "react";

export default function Calculator() {
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120] xl:px-[180px] py-10 flex flex-col gap-10">
      <h4 className="gradient-heading text-[40px] font-semibold text-center">
        Calculate Your Bitcoin Mining Profit
      </h4>
      <div className="flex sm:flex-row flex-col justify-center gap-5">
        <input
          type="text"
          className="border border-[#76C6E0CC] outline-none bg-[#013E72] rounded-md px-2 py-2 text-sm h-10 sm:w-[320px] w-full"
          placeholder="Enter Your investment"
        />
        <button className="btn-bg px-5 py-2 rounded-xl">CALCULATE</button>
      </div>
      <div className="customborder p-10 ">
        <div className="flex lg:flex-row flex-col lg:items-start items-center justify-around text-white">
          <div className="flex flex-col gap-10 lg:w-fit w-full">
            <p className="text-[#07EAD3] text-center">TRADING BTC</p>
            <div className="text-sm flex flex-col gap-2 lg:w-[320px]">
              <div className="flex justify-between grow">
                <p>Price of Bitcoin</p>
                <p>60,000$</p>
              </div>
              <div className="flex justify-between">
                <p>BTC bought</p>
                <p>0.0166</p>
              </div>
            </div>
            <div className="text-sm flex flex-col gap-2 lg:w-[320px]">
              <div className="flex justify-between border-b border-[#19AEFB] py-2 text-[#97E1FB]">
                <p>After 1 Year Bitcoin Value</p>
                <p>80,0000$</p>
              </div>
              <div className="flex justify-between">
                <p>Value of BTC Owned</p>
                <p>1666</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#97E1FB]">Profit while trading</p>
                <p className="text-xl font-semibold text-[#97E1FB]">1666$</p>
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
                <p>60,000$</p>
              </div>
              <div className="flex justify-between">
                <p>Hashrate bought</p>
                <p>100Th/s</p>
              </div>
              <div className="flex justify-between">
                <p>Hosting charge for 1 year</p>
                <p>500$</p>
              </div>
            </div>
            <div className="text-sm flex flex-col gap-2 lg:w-[320px]">
              <div className="flex justify-between border-b border-[#19AEFB] py-2 text-[#97E1FB]">
                <p>After 1 Year Bitcoin Value</p>
                <p>80,0000$</p>
              </div>
              <div className="flex justify-between">
                <p>BTC owned after 1 year</p>
                <p>60000$</p>
              </div>
              <div className="flex justify-between">
                <p>Total value of BTC owned</p>
                <p>60000$</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#97E1FB]">Profit while mining</p>
                <p className="text-xl font-semibold text-[#97E1FB]">59500$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
