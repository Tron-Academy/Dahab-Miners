import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import useLogoutUser from "../../hooks/auth/useLogoutUser";
import Loading from "../Loading";

export default function AdminHead({ toggle, toggleFunction, small, setSmall }) {
  const { user } = useSelector((state) => state.user);
  const [showLogout, setShowLogout] = useState(false);
  const { logout, loading } = useLogoutUser();
  return (
    <div className="p-3 h-20 bg-homeBg md:rounded-2xl w-full text-white flex justify-between items-center sticky top-0">
      <div
        className="text-2xl hidden md:block"
        onClick={() => toggleFunction(!toggle)}
      >
        <RxHamburgerMenu />
      </div>
      <div className="text-lg md:text-2xl">DAHAB MINERS ADMIN</div>
      <div
        className="text-2xl md:hidden block"
        onClick={() => setSmall(!small)}
      >
        <RxHamburgerMenu />
      </div>
      <div className="relative hidden md:block">
        <div
          className="flex cursor-pointer gap-2 items-center border p-2 rounded-lg hover:shadow-md hover:shadow-white hover:bg-blue-500 nav-link"
          onClick={() => setShowLogout(!showLogout)}
        >
          <div>
            <CiUser />
          </div>
          <p>{user ? user.username : "User"}</p>
          <div>
            <RiArrowDropDownLine />
          </div>
        </div>
        {showLogout && (
          <div
            className="z-10 absolute top-14 nav-link animate-slideInTop bg-homeBgGradient p-2 w-full left-0 rounded-lg flex gap-3 items-center cursor-pointer"
            onClick={() => logout()}
          >
            <p>Logout</p>
            <div>
              <IoLogOutOutline />
            </div>
            {loading && <Loading />}
          </div>
        )}
      </div>
    </div>
  );
  S;
}
