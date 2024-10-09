import React from "react";

export default function TableItem({ item, price }) {
  return (
    <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-medium">
      <div>{item}</div>
      <div className="text-left">{price}</div>
    </div>
  );
}
