import React, { useState } from "react";
import DataPageHeader from "../../../components/Admin/datas/DataPageHeader";
import DataTable from "../../../components/Admin/datas/DataTable";

export default function DataPage() {
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [client, setClient] = useState("");

  return (
    <div>
      <DataPageHeader
        model={model}
        serial={serial}
        client={client}
        setClient={setClient}
        setModel={setModel}
        setSerial={setSerial}
      />
      <DataTable model={model} serial={serial} client={client} />
    </div>
  );
}
