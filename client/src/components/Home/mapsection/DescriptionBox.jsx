import React from "react";

export default function DescriptionBox({ flag, place, amt, position }) {
  return (
    <div className={`absolute p-2 rounded-lg text-black ${position}`}>
      <div className="flex gap-2 items-center">
        <img src={flag} alt="Bitcoin Mining in Dubai" />
        <p>{place}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img src="/home/currency.png" alt="Bitcoin Mining in Dubai" />
        <p>{amt}</p>
      </div>
      {/* <p className="text-xs text-blue">Click to learn more</p> */}
    </div>
  );
}
