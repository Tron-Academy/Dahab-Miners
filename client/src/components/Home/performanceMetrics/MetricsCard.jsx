import React from "react";

export default function MetricsCard({ stat, content }) {
  return (
    <div className="bg-white rounded-lg p-5 h-[250px] w-[300px] flex flex-col justify-center items-center">
      <p className="text-[56px] font-semibold text-btnGreen">{stat}</p>
      <p className="text-xl font-semibold leading-8">{content}</p>
    </div>
  );
}
