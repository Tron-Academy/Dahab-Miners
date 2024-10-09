import React from "react";
import DashboardDetailBox from "../../../components/Admin/Dashboard/DashboardDetailBox";

export default function DashboardPage() {
  return (
    <div className="p-3">
      <div className="grid gap-5 grid-cols-2">
        <DashboardDetailBox title={"Products"} value={"7"} />
        <DashboardDetailBox title={"Category"} value={"3"} />
        <DashboardDetailBox title={"Blogs"} value={"2"} />
      </div>
    </div>
  );
}
