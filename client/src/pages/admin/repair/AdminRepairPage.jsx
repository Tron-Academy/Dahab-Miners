import React, { useEffect, useState } from "react";
import AdminRepairTable from "../../../components/Admin/repair/AdminRepairTable";
import AdminRepairHeader from "../../../components/Admin/repair/AdminRepairHeader";
import useGetRepairMiners from "../../../hooks/adminRepair/useGetRepairMiners";
import Loading from "../../../components/Loading";
import { useSelector } from "react-redux";

export default function AdminRepairPage() {
  const [search, setSearch] = useState("");
  const { loading, miners, refetch } = useGetRepairMiners({ search });
  const { refetchTrigger } = useSelector((state) => state.admin);

  useEffect(() => {
    refetch();
  }, [refetchTrigger]);
  return (
    <div>
      <AdminRepairHeader search={search} setSearch={setSearch} />
      {loading ? <Loading /> : <AdminRepairTable miners={miners} />}
    </div>
  );
}
