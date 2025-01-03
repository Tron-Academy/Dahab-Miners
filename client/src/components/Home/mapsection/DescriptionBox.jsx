import React from "react";

export default function DescriptionBox({ flag, place, amt, position }) {
  return (
    <div className={`absolute p-2 rounded-lg text-black ${position}`}>
      <div className="flex gap-2 items-center">
        <img src={flag} />
        <p>{place}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img src="/home/currency.png" />
        <p>{amt}</p>
      </div>
    </div>
  );
}