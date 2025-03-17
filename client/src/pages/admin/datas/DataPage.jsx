import React, { useState } from "react";
import DataPageHeader from "../../../components/Admin/datas/DataPageHeader";
import DataTable from "../../../components/Admin/datas/DataTable";

export default function DataPage() {
  return (
    <div>
      <DataPageHeader />
      <DataTable />
    </div>
  );
}
