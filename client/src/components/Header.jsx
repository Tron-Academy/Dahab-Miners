import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdArrowDropDown } from "react-icons/md";
import SmallHeader from "./SmallHeader";
import { handleChatClick } from "../utils/whatsapp";
import { motion } from "framer-motion";

export default function Header() {
  const [showSmallBar, setShowSmallBar] = useState(false);
  const [isHover, setisHover] = useState(false);

  return (
    <header
      className="md:h-20 h-16 px-5 md:px-10 lg:px-[120px] xl:px-[180px] cursor-pointer md:py-5 py-2 flex justify-between items-center relative z-50 bg-bottom bg-cover"
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
      <nav className="lg:flex gap-5 xl:gap-10 text-sm xl:text-base font-medium hidden">
        <NavLink className={"text-white"} to={"/"}>
          Home
        </NavLink>
        <NavLink className={"text-white"} to={"/buy"}>
          Buy Miners
        </NavLink>
        <div className="relative">
          <div
            className="text-white flex items-center gap-1"
            onClick={() => setisHover(!isHover)}
          >
            Host Miners
            <span className="text-xl">
              <MdArrowDropDown />
            </span>
          </div>
          {isHover && (
            <div className="absolute bg-[#000618] text-white shadow-lg rounded-md mt-2 w-40">
              <NavLink
                to={"/host"}
                className="block px-4 py-2 hover:bg-[#202225]"
                onClick={() => setisHover(false)}
                end
              >
                Hosting
              </NavLink>
              <NavLink
                to={"/host/abudhabi"}
                className="block px-4 py-2 hover:bg-[#202225]"
                onClick={() => setisHover(false)}
              >
                Abu Dhabi
              </NavLink>
              <NavLink
                to={"/host/ethiopia"}
                className="block px-4 py-2 hover:bg-[#202225]"
                onClick={() => setisHover(false)}
              >
                Ethiopia
              </NavLink>
            </div>
          )}
        </div>
        <NavLink className={"text-white"} to={"/repair"}>
          Miner Repair
        </NavLink>
        <NavLink className={"text-white"} to={"/blogs"}>
          Blogs
        </NavLink>
        <NavLink className={"text-white"} to={"/about"}>
          About Us
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
        className="lg:hidden text-white text-xl"
        onClick={() => setShowSmallBar(!showSmallBar)}
      >
        <RxHamburgerMenu />
      </button>
      {showSmallBar && (
        <div className="absolute w-full top-16 left-0 z-20 animate-slideInTop">
          <SmallHeader setSmallBar={setShowSmallBar} />
        </div>
      )}
    </header>
  );
}

/*        {isHover && (
            <div
              className="bg-[#000618] absolute top-5 right-0 p-5 flex flex-col gap-3 min-w-[150px] rounded-lg "
              onMouseEnter={() => setisHover(true)}
              onMouseLeave={() => setisHover(false)}
            >
              <NavLink
                className={"text-white border-b border-[#07EAD3] py-2"}
                to={"/host/abudhabi"}
              >
                Abu Dhabi
              </NavLink>
              <NavLink className={"text-white"} to={"/host/abudhabi"}>
                Ethiopia
              </NavLink>
            </div>
          )} */
