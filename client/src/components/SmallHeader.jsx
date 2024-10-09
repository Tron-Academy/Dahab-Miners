import React from "react";
import { NavLink } from "react-router-dom";
import { handleChatClick } from "../utils/whatsapp";

export default function SmallHeader({ setSmallBar }) {
  return (
    <div className="lg:hidden w-full bg-white py-5">
      <div className="flex flex-col gap-5 items-center">
        <NavLink to={"/"} onClick={() => setSmallBar(false)}>
          Home
        </NavLink>
        <NavLink to={"/buy"} onClick={() => setSmallBar(false)}>
          Buy Miners
        </NavLink>
        <NavLink to={"/host"} onClick={() => setSmallBar(false)}>
          Host Mining
        </NavLink>
        <NavLink to={"/repair"} onClick={() => setSmallBar(false)}>
          Miner Repair
        </NavLink>
        <button
          className="bg-btnGreen hover:bg-btnHover nav-link text-white rounded-lg px-4 py-2"
          onClick={handleChatClick}
        >
          Contact us
        </button>
      </div>
    </div>
  );
}
