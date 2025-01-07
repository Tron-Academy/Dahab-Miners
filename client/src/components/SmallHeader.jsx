import React from "react";
import { NavLink } from "react-router-dom";
import { handleChatClick } from "../utils/whatsapp";

export default function SmallHeader({ setSmallBar }) {
  return (
    <header className="lg:hidden w-full main-bg text-white py-5">
      <nav className="flex flex-col gap-2 items-center px-3">
        <NavLink
          to={"/"}
          className={"border-b w-full text-center py-2 border-[#9eede0]"}
          onClick={() => setSmallBar(false)}
        >
          Home
        </NavLink>
        <NavLink
          to={"/buy"}
          className={"border-b w-full text-center py-2 border-[#9eede0]"}
          onClick={() => setSmallBar(false)}
        >
          Buy Miners
        </NavLink>
        <NavLink
          to={"/host"}
          className={"border-b w-full text-center py-2 border-[#9eede0]"}
          onClick={() => setSmallBar(false)}
        >
          Host Mining
        </NavLink>
        <NavLink
          to={"/repair"}
          className={"border-b w-full text-center py-2 border-[#9eede0]"}
          onClick={() => setSmallBar(false)}
        >
          Miner Repair
        </NavLink>
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
