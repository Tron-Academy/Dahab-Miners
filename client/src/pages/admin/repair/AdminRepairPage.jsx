import React from "react";
import AdminRepairTable from "../../../components/Admin/repair/AdminRepairTable";
import AdminRepairHeader from "../../../components/Admin/repair/AdminRepairHeader";
import useGetRepairMiners from "../../../hooks/adminRepair/useGetRepairMiners";
import Loading from "../../../components/Loading";

export default function AdminRepairPage() {
  const { loading, miners } = useGetRepairMiners();
  return (
    <div>
      <AdminRepairHeader />
      {loading ? <Loading /> : <AdminRepairTable miners={miners} />}
    </div>
  );
}
