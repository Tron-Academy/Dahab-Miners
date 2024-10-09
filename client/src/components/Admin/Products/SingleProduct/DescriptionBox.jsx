import React from "react";

export default function DescriptionBox({ desc }) {
  return (
    <div className="bg-btnGreen p-5 rounded-lg">
      <p className=" leading-8">{desc}</p>
    </div>
  );
}
