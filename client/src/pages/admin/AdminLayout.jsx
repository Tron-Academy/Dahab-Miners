import React, { useState } from "react";
import AdminHead from "../../components/Admin/AdminHead";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import useGetUser from "../../hooks/auth/useGetUser";
import Loading from "../../components/Loading";
import SmallSizeSideBar from "../../components/Admin/SmallSizeSideBar";

export default function AdminLayout() {
  const { loading } = useGetUser();
  const [showSideBar, setShowSideBar] = useState(true);
  const [showSmallSizeBar, setShowSmallSizeBar] = useState(false);
  return loading ? (
    <Loading />
  ) : (
    <div className="bg-neutral-300 md:pt-2 md:px-2">
      <div className="flex gap-2">
        {showSideBar && <AdminSidebar />}
        <div className="w-full">
          <AdminHead
            toggle={showSideBar}
            toggleFunction={setShowSideBar}
            small={showSmallSizeBar}
            setSmall={setShowSmallSizeBar}
          />
          {showSmallSizeBar && (
            <SmallSizeSideBar setSmall={setShowSmallSizeBar} />
          )}
          <div className="p-3 px-5 min-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
