import React, { useState } from "react";
import DataPageHeader from "../../../components/Admin/datas/DataPageHeader";
import DataTable from "../../../components/Admin/datas/DataTable";

export default function DataPage() {
  const [mac, setMac] = useState("");
  const [serial, setSerial] = useState("");
  const [client, setClient] = useState("");

  return (
    <div>
      <DataPageHeader
        mac={mac}
        serial={serial}
        client={client}
        setClient={setClient}
        setMac={setMac}
        setSerial={setSerial}
      />
      <DataTable mac={mac} serial={serial} client={client} />
    </div>
  );
}
