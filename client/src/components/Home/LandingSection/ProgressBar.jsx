import React from "react";
import { GoDotFill } from "react-icons/go";

export default function ProgressBar({ host, repair }) {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 mx-auto">
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
        <h4 className="text-btnGreen">Buy</h4>
        <h4 className={`ml-5 ${host || repair ? "text-btnGreen" : ""}`}>
          Host
        </h4>
        <h4 className={`${repair && "text-btnGreen"}`}>Repair</h4>
      </div>
    </div>
  );
}
