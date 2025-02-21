import React, { useEffect, useState } from "react";
import FormInput from "../../../FormInput";
import { useParams } from "react-router-dom";
import useGetSingleData from "../../../../hooks/adminDatas/useGetSingleData";
import Loading from "../../../Loading";
import useEditData from "../../../../hooks/adminDatas/useEditData";

export default function EditDataForm() {
  const { id } = useParams();
  const { loading, data } = useGetSingleData({ id });
  const [clientName, setClientName] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [location, setLocation] = useState("");
  const [temporary, setTemporary] = useState("");
  const { loading: editLoading, editData } = useEditData();

  useEffect(() => {
    if (data) {
      setClientName(data.clientName);
      setModelNumber(data.modelNumber);
      setSerialNumber(data.serialNumber);
      setMacAddress(data.macAddress);
      setLocation(data.location);
      setTemporary(data.temporaryOwner ? data.temporaryOwner : "");
    }
  }, [loading, data]);
  return loading ? (
    <Loading />
  ) : (
    <div className="my-10">
      <FormInput
        title={"Client Name"}
        admin
        value={clientName}
        onchange={(e) => setClientName(e.target.value)}
        type={"text"}
        placeholder={"Enter client Name"}
      />
      <FormInput
        title={"Model Number"}
        admin
        value={modelNumber}
        onchange={(e) => setModelNumber(e.target.value)}
        type={"text"}
        placeholder={"Enter Model No"}
      />
      <FormInput
        title={"Serial Number"}
        admin
        value={serialNumber}
        onchange={(e) => setSerialNumber(e.target.value)}
        type={"text"}
        placeholder={"Enter Serial No"}
      />
      <FormInput
        title={"Mac Address"}
        admin
        value={macAddress}
        onchange={(e) => setMacAddress(e.target.value)}
        type={"text"}
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
            editData({
              id,
              clientName,
              modelNumber,
              serialNumber,
              macAddress,
              location,
              temporary,
            })
          }
          className="bg-homeBg p-2 px-4 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Save
        </button>
      </div>
      {editLoading && <Loading />}
    </div>
  );
}
