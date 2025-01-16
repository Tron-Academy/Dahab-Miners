import React from "react";

export default function EthiopiaAdvantageElt({ heading, content }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-2xl font-semibold text-[#07EAD3]">{heading}</h4>
      <p>{content}</p>
    </div>
  );
}
