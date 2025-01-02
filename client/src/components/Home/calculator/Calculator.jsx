import React from "react";

export default function Calculator() {
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[180px] py-10 flex flex-col gap-10">
      <h4 className="gradient-heading text-[40px] font-semibold text-center">
        Calculate Your Bitcoin Mining Profit
      </h4>
      <div className="customborder p-10 ">
        <div className="flex items-start justify-around text-white">
          <div className="flex flex-col gap-10">
            <p className="text-[#07EAD3]">TRADING BTC</p>
            <div className="text-sm flex flex-col gap-2">
              <input
                type="text"
                className="border border-[#76C6E0CC] outline-none bg-transparent rounded-md px-2 py-2 text-sm h-10 w-[350px]"
                placeholder="Enter Your investment"
              />
              <div className="flex justify-between">
                <p>Price of Bitcoin</p>
                <p>60,000$</p>
              </div>
              <div className="flex justify-between">
                <p>BTC bought</p>
                <p>0.0166</p>
              </div>
            </div>
            <div className="text-sm flex flex-col gap-2">
              <input
                type="text"
                className="border border-[#76C6E0CC] outline-none bg-transparent rounded-md px-2 py-2 text-sm h-10 w-[350px]"
                placeholder="Enter Price of BTC after 1 year"
              />
              <div className="flex justify-between">
                <p>Value of BTC Owned</p>
                <p>1666</p>
              </div>
              <div className="flex justify-between">
                <p>Profit while trading</p>
                <p>1666</p>
              </div>
            </div>
          </div>
          <img
            src="/home/roundlogo.png"
            alt="logo of dahab miners"
            className="self-center"
          />
          <div className="flex flex-col gap-10">
            <p className="text-[#07EAD3]">MINING BTC</p>
            <div className="text-sm flex flex-col gap-2">
              <input
                type="text"
                className="border border-[#76C6E0CC] outline-none bg-transparent rounded-md px-2 py-2 text-sm h-10 w-[350px]"
                placeholder="Enter Your investment"
              />
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
            <div className="text-sm flex flex-col gap-2">
              <input
                type="text"
                className="border border-[#76C6E0CC] outline-none bg-transparent rounded-md px-2 py-2 text-sm h-10 w-[350px]"
                placeholder="Enter Price of BTC after 1 year"
              />
              <div className="flex justify-between">
                <p>BTC owned after 1 year</p>
                <p>60000$</p>
              </div>
              <div className="flex justify-between">
                <p>Total value of BTC owned</p>
                <p>60000$</p>
              </div>
              <div className="flex justify-between">
                <p>Profit while mining</p>
                <p>59500$</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn-bg px-5 py-2 rounded-xl">CALCULATE</button>
        </div>
      </div>
    </section>
  );
}
