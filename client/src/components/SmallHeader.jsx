import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { handleChatClick } from "../utils/whatsapp";
import { MdArrowDropDown } from "react-icons/md";

export default function SmallHeader({ setSmallBar }) {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <header className="lg:hidden w-full bg-[#000618] text-white py-5">
      <nav className="flex flex-col gap-2 items-start px-3">
        <NavLink
          to={"/"}
          className={"border-b w-full py-2 border-[#9eede0]"}
          onClick={() => setSmallBar(false)}
        >
          Home
        </NavLink>
        <NavLink
          to={"/buy"}
          className={"border-b w-full py-2 border-[#9eede0]"}
          onClick={() => setSmallBar(false)}
        >
          Buy Miners
        </NavLink>
        <div className={"border-b w-full py-2 border-[#9eede0]"}>
          <NavLink
            to={"/host"}
            onClick={() => setSmallBar(false)}
            className="flex gap-2 items-center"
            // onClick={() => setShowDrop(!showDrop)}
          >
            <p>Host Mining</p>
            {/* <span className="text-xl">
              <MdArrowDropDown />
            </span> */}
          </NavLink>
          {/* {showDrop && (
            <div className="flex flex-col gap-3 ms-7 my-5">
              <NavLink
                to={"/host"}
                className={"py-1"}
                onClick={() => setSmallBar(false)}
                end
              >
                - Hosting
              </NavLink>
              <NavLink
                to={"/host/abudhabi"}
                className={"py-1"}
                onClick={() => setSmallBar(false)}
              >
                - Abu Dhabi
              </NavLink>

              <NavLink
                to={"/host/ethiopia"}
                className={"py-1"}
                onClick={() => setSmallBar(false)}
              >
                - Ethiopia
              </NavLink>
            </div>
          )} */}
        </div>
        <NavLink
          to={"/repair"}
          className={"border-b w-full py-2 border-[#9eede0]"}
          onClick={() => setSmallBar(false)}
        >
          Miner Repair
        </NavLink>
        <NavLink
          className={"border-b w-full py-2 border-[#9eede0]"}
          onClick={() => setSmallBar(false)}
          to={"/blogs"}
        >
          Blogs
        </NavLink>
        {/* <NavLink
          className={"border-b w-full py-2 border-[#9eede0]"}
          onClick={() => setSmallBar(false)}
          to={"/about"}
        >
          About Us
        </NavLink> */}
        <button
          className="btn-bg text-white rounded-lg px-4 py-2"
          onClick={handleChatClick}
        >
          Contact us
        </button>
      </nav>
    </header>
  );
}
