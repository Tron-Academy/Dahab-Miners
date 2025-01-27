import React from "react";

export default function SecondSectionHeaderElement({ icon, text, style }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 lg:border-0 border rounded-lg lg:h-auto h-[150px] border-[#BCFCF1CC] px-3 ${style} z-[1]`}
    >
      <img src={icon} className="sm:w-10 w-7" />
      <p className="text-white sm:text-sm text-xs">{text}</p>
    </div>
  );
}
