import React from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

export default function CarouselNavigation({ setItem, item }) {
  function prev() {
    setItem(item - 1);
  }
  function next() {
    setItem(item + 1);
  }
  return (
    <div className="flex justify-between text-3xl lg:text-5xl text-gray-600  font-thin">
      <button
        disabled={item === 1}
        className="hover:text-gray-400 nav-link cursor-pointer"
        onClick={prev}
      >
        <BsArrowLeftCircle />
      </button>
      <button
        disabled={item === 3}
        className="hover:text-gray-400 nav-link z-20 cursor-pointer"
        onClick={next}
      >
        <BsArrowRightCircle />
      </button>
    </div>
  );
}
