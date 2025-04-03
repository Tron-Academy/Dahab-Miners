import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

export default function SectionHeadings({ name, setActive, active }) {
  return (
    <div
      className="flex justify-between items-center bg-homeBgGradient px-4 py-5 text-white rounded-md cursor-pointer"
      onClick={() => setActive(!active)}
    >
      <p>{name}</p>
      <button>
        <FaAngleDown />
      </button>
    </div>
  );
}
