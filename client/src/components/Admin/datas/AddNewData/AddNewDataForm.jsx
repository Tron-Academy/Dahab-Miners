import React, { useState } from "react";
import FormInput from "../../../FormInput";
import useAddNewData from "../../../../hooks/adminDatas/useAddNewData";
import Loading from "../../../Loading";

export default function AddNewDataForm() {
  const [clientName, setClientName] = useState("");
  const [modelName, setModelName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [actualLocation, setActualLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
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
        title={"Model Name"}
        admin
        type={"text"}
        value={modelName}
        onchange={(e) => setModelName(e.target.value)}
        placeholder={"Enter Model Name"}
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
        title={"Actual Location"}
        admin
        type={"text"}
        value={actualLocation}
        onchange={(e) => setActualLocation(e.target.value)}
        placeholder={"Enter Actual location"}
      />
      <FormInput
        title={"Current Location"}
        admin
        type={"text"}
        value={currentLocation}
        onchange={(e) => setCurrentLocation(e.target.value)}
        placeholder={"Enter Current Location"}
      />

      <FormInput
        title={"Now Running"}
        admin
        type={"text"}
        value={temporary}
        onchange={(e) => setTemporary(e.target.value)}
        placeholder={"Enter now running status"}
      />
      <div className="flex justify-end">
        <button
          onClick={() =>
            addNewData({
              clientName,
              macAddress,
              actualLocation,
              currentLocation,

              serialNumber,
              modelName,
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
