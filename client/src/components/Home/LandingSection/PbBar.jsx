import React from "react";
import { GoDotFill } from "react-icons/go";
export default function PbBar({ host, repair, setItem }) {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 mx-auto">
      <div className="flex items-center gap-0 text-sm text-white">
        <div
          className="rounded-full w-14 h-14 bg-btnGreen border-0 flex justify-center items-center cursor-pointer"
          onClick={() => setItem(1)}
        >
          Buy
        </div>
        <div className="h-2 w-[100px] bg-btnGreen border-0"></div>
        <div
          className={`h-2 md:block hidden w-[100px]  ${
            host || repair ? "bg-btnGreen" : "bg-homeBg"
          }`}
        ></div>
        <div
          className={`rounded-full flex justify-center cursor-pointer items-center w-14 h-14 ${
            host || repair ? "bg-btnGreen" : "bg-homeBg"
          }`}
          onClick={() => setItem(2)}
        >
          Host
        </div>
        <div
          className={`h-2 w-[100px] md:w-[200px]  ${
            repair ? "bg-btnGreen" : "bg-homeBg"
          }`}
        ></div>
        <div
          className={`rounded-full flex justify-center cursor-pointer z-10 items-center w-14 h-14 ${
            repair ? "bg-btnGreen" : "bg-homeBg"
          }`}
          onClick={() => setItem(3)}
        >
          Repair
        </div>
      </div>
    </div>
  );
}

/**<div className="flex flex-col items-center justify-center w-1/2 mx-auto">
      <div className="flex items-center gap-0">
        <div className="rounded-full w-5 h-5 bg-btnGreen border-0"></div>
        <div className="h-2 w-[100px] bg-btnGreen border-0"></div>
        <div
          className={`h-2 w-[100px]  ${
            host || repair ? "bg-btnGreen" : "bg-homeBg"
          }`}
        ></div>
        <div
          className={`rounded-full w-5 h-5 ${
            host || repair ? "bg-btnGreen" : "bg-homeBg"
          }`}
        ></div>
        <div
          className={`h-2 w-[200px]  ${repair ? "bg-btnGreen" : "bg-homeBg"}`}
        ></div>
        <div
          className={`rounded-full w-5 h-5 ${
            repair ? "bg-btnGreen" : "bg-homeBg"
          }`}
        ></div>
      </div>
      <div className="flex justify-evenly w-full font-semibold text-xl py-3 text-homeBg">
        <h1 className="text-btnGreen">Buy</h1>
        <h1 className={`ml-5 ${host || repair ? "text-btnGreen" : ""}`}>
          Host
        </h1>
        <h1 className={`${repair && "text-btnGreen"}`}>Repair</h1>
      </div>
    </div> */
