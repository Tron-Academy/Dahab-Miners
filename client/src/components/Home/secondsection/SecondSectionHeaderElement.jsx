import React from "react";

export default function SecondSectionHeaderElement({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <img src={icon} className="w-10" />
      <p className="text-white text-sm">{text}</p>
    </div>
  );
}
