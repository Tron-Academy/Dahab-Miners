import React, { useState } from "react";
import AdminHead from "../../components/Admin/AdminHead";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import useGetUser from "../../hooks/auth/useGetUser";
import Loading from "../../components/Loading";
import SmallSizeSideBar from "../../components/Admin/SmallSizeSideBar";
import { useSelector } from "react-redux";
import DeletePopup from "../../components/Admin/DeletePopup";

export default function AdminLayout() {
  const { loading } = useGetUser();
  const [showSideBar, setShowSideBar] = useState(true);
  const [showSmallSizeBar, setShowSmallSizeBar] = useState(false);
  const { showPopup } = useSelector((state) => state.admin);
  return loading ? (
    <Loading />
  ) : (
    <div className="bg-neutral-300 md:pt-2 md:px-2 text-black">
      <div className="flex gap-2">
        {showSideBar && <AdminSidebar />}
        <div className="w-full overflow-x-scroll">
          <AdminHead
            toggle={showSideBar}
            toggleFunction={setShowSideBar}
            small={showSmallSizeBar}
            setSmall={setShowSmallSizeBar}
          />
          {showSmallSizeBar && (
            <SmallSizeSideBar setSmall={setShowSmallSizeBar} />
          )}
          {showPopup && <DeletePopup />}
          <div className="py-3  min-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
