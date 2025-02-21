import React, { useState } from "react";
import FormInput from "../../../FormInput";
import useAddNewData from "../../../../hooks/adminDatas/useAddNewData";
import Loading from "../../../Loading";

export default function AddNewDataForm() {
  const [clientName, setClientName] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [location, setLocation] = useState("");
  const [temporary, setTemporary] = useState("");
  const { loading, addNewData } = useAddNewData();
  return (
    <div className="my-10">
      <FormInput
        title={"Client Name"}
        admin
        type={"text"}
        value={clientName}
        onchange={(e) => setClientName(e.target.value)}
        placeholder={"Enter client Name"}
      />
      <FormInput
        title={"Model Number"}
        admin
        type={"text"}
        value={modelNumber}
        onchange={(e) => setModelNumber(e.target.value)}
        placeholder={"Enter Model No"}
      />
      <FormInput
        title={"Serial Number"}
        admin
        type={"text"}
        value={serialNumber}
        onchange={(e) => setSerialNumber(e.target.value)}
        placeholder={"Enter Serial No"}
      />
      <FormInput
        title={"Mac Address"}
        admin
        type={"text"}
        value={macAddress}
        onchange={(e) => setMacAddress(e.target.value)}
        placeholder={"Enter Mac Address"}
      />
      <FormInput
        title={"Location"}
        admin
        type={"text"}
        value={location}
        onchange={(e) => setLocation(e.target.value)}
        placeholder={"Enter location"}
      />
      <FormInput
        title={"Temporary Client"}
        admin
        type={"text"}
        value={temporary}
        onchange={(e) => setTemporary(e.target.value)}
        placeholder={"Enter Client"}
      />
      <div className="flex justify-end">
        <button
          onClick={() =>
            addNewData({
              location,
              clientName,
              macAddress,
              serialNumber,
              modelNumber,
              temporary,
            })
          }
          className="bg-homeBg p-2 px-4 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Save
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
}
