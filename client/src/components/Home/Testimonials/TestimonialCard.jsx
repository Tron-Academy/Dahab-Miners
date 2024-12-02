import React from "react";
import { TiTick } from "react-icons/ti";
import { MdOutlineStar } from "react-icons/md";

export default function TestimonialCard({ name, content }) {
  return (
    <div className="p-3 py-2 rounded-lg border border-btnGreen flex flex-col gap-5 min-h-[250px]">
      {/* <p className="text-sm font-medium text-[#98A2B3]">1 day ago</p> */}
      <h4 className="flex items-center gap-2 text-lg font-semibold">
        {name}
        <span className="text-btnGreen bg-[#1ECBAF33] rounded-full">
          <TiTick />
        </span>
      </h4>
      <div className="flex gap-2 text-xl text-[#FDB022]">
        <MdOutlineStar />
        <MdOutlineStar />
        <MdOutlineStar />
        <MdOutlineStar />
        <MdOutlineStar />
      </div>
      <p className="text-base font-normal">"{content}"</p>
    </div>
  );
}
