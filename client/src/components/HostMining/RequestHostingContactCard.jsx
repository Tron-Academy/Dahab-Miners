import React from "react";

export default function RequestHostingContactCard({ icon, content }) {
  return (
    <div className="bg-[#B9EFE6] p-3 flex flex-col gap-5 rounded-lg">
      <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center text-[#16A28C] text-2xl">
        {icon}
      </div>
      <h1 className="text-base font-medium text-[#16A28C]">{content}</h1>
    </div>
  );
}
