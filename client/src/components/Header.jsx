import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import SmallHeader from "./SmallHeader";
import { handleChatClick } from "../utils/whatsapp";
import { motion } from "framer-motion";

export default function Header() {
  const [showSmallBar, setShowSmallBar] = useState(false);

  return (
    <header
      className="md:h-20 h-16 px-5 md:px-10 lg:px-[180px] cursor-pointer md:py-5 py-2 flex justify-between items-center relative z-50 bg-bottom bg-cover"
      style={{ backgroundImage: `url("/home/headerbg.jpg")` }}
    >
      <Link
        to={"/"}
        className="w-36 h-14 mt-5"
        onClick={() => window.scrollTo(0, 0)}
      >
        <img
          src="/home/logo.png"
          alt="Special-offers-on-crypto-mining-machines-in-abu-dhabi-UAE"
          title="Explore top-tier CRYPTO MINING MACHINES IN UAE at Dahab Miners. Specializing in high-efficiency ASIC miners in Abu Dhabi, UAE, we offer the best solutions for crypto mining in UAE. Browse our range today and enhance your mining setup!"
        ></img>
      </Link>
      <nav className="lg:flex gap-5 xl:gap-14 text-sm xl:text-base font-medium hidden">
        <NavLink className={"text-white"} to={"/"}>
          Home
        </NavLink>
        <NavLink className={"text-white"} to={"/buy"}>
          Buy Miners
        </NavLink>
        <NavLink className={"text-white"} to={"/host"}>
          Host Mining
        </NavLink>
        <NavLink className={"text-white"} to={"/repair"}>
          Miner Repair
        </NavLink>
        <NavLink className={"text-white"} to={"/blogs"}>
          Blogs
        </NavLink>
      </nav>
      <motion.button
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1, backgroundColor: "#7decda" }} // Change color on hover
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }} // Smooth animation
        className="btn-bg text-white rounded-lg px-4 py-2 hidden lg:block"
        onClick={handleChatClick}
      >
        Contact us
      </motion.button>
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
    </header>
  );
}
