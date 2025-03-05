import React, { useState } from "react";
import DataPageHeader from "../../../components/Admin/datas/DataPageHeader";
import DataTable from "../../../components/Admin/datas/DataTable";

export default function DataPage() {
  const [search, setSearch] = useState("");
  const [farm, setFarm] = useState("ALL");
  return (
    <div>
      <DataPageHeader
        search={search}
        setSearch={setSearch}
        farm={farm}
        setFarm={setFarm}
      />
      <DataTable search={search} farm={farm} />
    </div>
  );
}
