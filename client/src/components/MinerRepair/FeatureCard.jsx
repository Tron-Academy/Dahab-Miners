import React from "react";

export default function FeatureCard({ title, content }) {
  return (
    <div className="bg-[#060E23] p-5 rounded-lg flex flex-col gap-10 justify-center text-center items-center">
      <h1 className="text-2xl font-semibold text-[#1ECBAF]">{title}</h1>
      <p className="text-base font-normal text-white leading-6 max-w-[317px] text-center">
        {content}
      </p>
    </div>
  );
}
