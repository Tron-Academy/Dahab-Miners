import React from "react";
import DashboardDetailBox from "../../../components/Admin/Dashboard/DashboardDetailBox";
import useGetDashboardStats from "../../../hooks/adminDashboard/useGetDashboardStats";
import Loading from "../../../components/Loading";

export default function DashboardPage() {
  const { loading, products, blogs } = useGetDashboardStats();
  return loading ? (
    <Loading />
  ) : (
    <div className="p-3">
      <div className="grid gap-5 grid-cols-2">
        <DashboardDetailBox title={"Products"} value={products} />
        <DashboardDetailBox title={"Blogs"} value={blogs} />
      </div>
    </div>
  );
}
