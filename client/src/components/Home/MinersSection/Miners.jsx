import React from "react";

import { Link } from "react-router-dom";
import FeaturedCarousel from "./FeaturedCarousel";

export default function Miners() {
  return (
    <div className="bg-white px-5 md:px-10 lg:px-[120px] py-10">
      <div className="text-center">
        <p className="text-base font-semibold text-btnGreen py-5">Miners</p>
        <h2 className="text-[40px] font-semibold gradient-heading mb-5">
          <a href="https://dahabminers.ae/">Buy Bitcoin Machines in Dubai</a>
        </h2>
        <Link
          to={"/buy"}
          className="px-3 py-2 my-5 rounded-lg text-base font-semibold border hover:bg-gray-300 nav-link border-gray-300"
        >
          View all Products
        </Link>
      </div>
      <FeaturedCarousel />
      <div className="flex justify-around">
        <div></div>
        {/* <div className="text-3xl flex gap-2">
          <div className="w-12 h-12 border flex items-center justify-center rounded-lg">
            <MdKeyboardArrowLeft />
          </div>
          <div className="w-12 h-12 border flex items-center justify-center rounded-lg">
            <MdKeyboardArrowRight />
          </div>
        </div> */}
      </div>
    </div>
  );
}
