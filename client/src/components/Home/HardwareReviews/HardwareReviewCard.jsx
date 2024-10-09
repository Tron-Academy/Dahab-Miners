import React from "react";

export default function HardwareReviewCard({ icon, content }) {
  return (
    <div className="bg-white rounded-lg p-5 h-[220px] flex flex-col justify-between">
      <div>
        <div className="text-2xl font-semibold w-10 h-10 rounded-lg bg-btnGreen text-white flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-lg font-semibold leading-7">{content}</div>
    </div>
  );
}
