import React, { useState } from "react";
import { adminNavLinks } from "../../utils/adminNavlinks";
import NavigationLink from "./NavigationLink";
import { CiUser } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import Loading from "../Loading";
import { IoMdClose } from "react-icons/io";
import useLogoutUser from "../../hooks/auth/useLogoutUser";
import { useSelector } from "react-redux";

export default function SmallSizeSideBar({ setSmall }) {
  const { user } = useSelector((state) => state.user);
  const [showLogout, setShowLogout] = useState(false);
  const { logout, loading } = useLogoutUser();
  return (
    <div className="xl:hidden w-full bg-homeBg px-5 py-10 absolute right-0 left-0 z-20 animate-slideInTop">
      <div
        className="flex justify-end text-white text-2xl"
        onClick={() => setSmall(false)}
      >
        <IoMdClose />
      </div>
      <div className="flex flex-col gap-3">
        {adminNavLinks.map((x) => (
          <NavigationLink
            key={x.id}
            icon={x.icon}
            name={x.name}
            path={x.path}
            urlworld={x.urlword}
          />
        ))}
      </div>
      <div className="relative text-white">
        <div
          className="flex cursor-pointer gap-2 justify-between items-center border p-2 rounded-lg hover:shadow-md hover:shadow-white hover:bg-blue-500 nav-link w-fit"
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
}
