import React, { useEffect, useState } from "react";
import AdminInventoryHeader from "../../../components/Admin/inventory/AdminInventoryHeader";
import AdminInventoryTable from "../../../components/Admin/inventory/AdminInventoryTable";
import useGetAllInventory from "../../../hooks/adminInventory/useGetAllInventory";
import Loading from "../../../components/Loading";
import { useSelector } from "react-redux";

export default function AdminInventoryPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const { loading, items, refetch } = useGetAllInventory({ search, type });

  const { refetchTrigger } = useSelector((state) => state.admin);

  useEffect(() => {
    refetch();
  }, [refetchTrigger]);
  return loading ? (
    <Loading />
  ) : (
    <div>
      <AdminInventoryHeader
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
      />
      <AdminInventoryTable items={items} />
    </div>
  );
}
