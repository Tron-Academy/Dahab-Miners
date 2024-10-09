import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import SmallHeader from "./SmallHeader";
import { handleChatClick } from "../utils/whatsapp";

export default function Header() {
  const [showSmallBar, setShowSmallBar] = useState(false);

  return (
    <div className="bg-white h-20 px-5 md:px-10 lg:px-[120px] cursor-pointer py-5 border-b flex justify-between items-center relative z-50">
      <Link
        to={"/"}
        className="w-36 h-14 mt-5"
        onClick={() => window.scrollTo(0, 0)}
      >
        <img
          src="/mainlogo.png"
          alt="Special-offers-on-crypto-mining-machines-in-abu-dhabi-UAE"
          title="Explore top-tier CRYPTO MINING MACHINES IN UAE at Dahab Miners. Specializing in high-efficiency ASIC miners in Abu Dhabi, UAE, we offer the best solutions for crypto mining in UAE. Browse our range today and enhance your mining setup!"
        ></img>
      </Link>
      <div className="lg:flex gap-5 xl:gap-14 text-sm xl:text-base font-medium hidden">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/buy"}>Buy Miners</NavLink>
        <NavLink to={"/host"}>Host Mining</NavLink>
        <NavLink to={"/repair"}>Miner Repair</NavLink>
        <NavLink to={"/blogs"}>Blogs</NavLink>
      </div>
      <button
        className="bg-btnGreen hover:bg-btnHover nav-link text-white rounded-lg px-4 py-2 hidden lg:block"
        onClick={handleChatClick}
      >
        Contact us
      </button>
      <button
        className="lg:hidden"
        onClick={() => setShowSmallBar(!showSmallBar)}
      >
        <RxHamburgerMenu />
      </button>
      {showSmallBar && (
        <div className="absolute w-full top-20 left-0 z-20 animate-slideInTop">
          <SmallHeader setSmallBar={setShowSmallBar} />
        </div>
      )}
    </div>
  );
}
