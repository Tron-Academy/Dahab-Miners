import React from "react";

export default function MetricsCard({ stat, content, border }) {
  return (
    <div
      className={`p-5 w-[300px] flex flex-col justify-center items-center ${
        border && "border-e border-[#118FF9]"
      }`}
    >
      <p className="text-[40px] font-semibold text-[#01C3FD]">{stat}</p>
      <p className="text-sm font-semibold text-white leading-8">{content}</p>
    </div>
  );
}
