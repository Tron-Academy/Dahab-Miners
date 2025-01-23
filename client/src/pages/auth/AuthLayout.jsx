import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="bg-homeBg w-screen h-screen ">
      <img className="w-32 h-32 mx-5" src="/adminlogo.png"></img>
      <div className="flex justify-center items-center mt-5">
        <Outlet />
      </div>
    </div>
  );
}
