import React, { useEffect, useState } from "react";
import FormInput from "../../../FormInput";
import { useParams } from "react-router-dom";
import useGetSingleData from "../../../../hooks/adminDatas/useGetSingleData";
import Loading from "../../../Loading";
import useEditData from "../../../../hooks/adminDatas/useEditData";
import { useSelector } from "react-redux";
import useRestrictedEdit from "../../../../hooks/adminDatas/useRestrictedEdit";

export default function EditDataForm() {
  const { id } = useParams();
  const { loading, data } = useGetSingleData({ id });
  const [clientName, setClientName] = useState("");
  const [modelName, setModelName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [actualLocation, setActualLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [temporary, setTemporary] = useState("");
  const { user } = useSelector((state) => state.user);
  const { loading: editLoading, editData } = useEditData();
  const { loading: restrictedLoading, EditRestrictedData } =
    useRestrictedEdit();

  useEffect(() => {
    if (data) {
      setClientName(data.clientName);
      setModelName(data.modelName);
      setSerialNumber(data.serialNumber);
      setMacAddress(data.macAddress);
      setTemporary(data.temporaryOwner ? data.temporaryOwner : "");
      setActualLocation(data.actualLocation);
      setCurrentLocation(data.currentLocation);
      setWorkerId(data.workerId);
    }
  }, [loading, data]);

  const handleClick = async () => {
    if (user?.role === "superAdmin") {
      editData({
        id,
        clientName,
        modelName,
        actualLocation,
        currentLocation,
        workerId,
        serialNumber,
        macAddress,
        temporary,
      });
    } else {
      EditRestrictedData({ id, currentLocation, temporary });
    }
  };
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
        disabled={user?.role === "admin" ? true : false}
      />
      <FormInput
        title={"Model Name"}
        admin
        value={modelName}
        onchange={(e) => setModelName(e.target.value)}
        type={"text"}
        placeholder={"Enter Model Name"}
        disabled={user?.role === "admin" ? true : false}
      />
      <FormInput
        title={"Serial Number"}
        admin
        value={serialNumber}
        onchange={(e) => setSerialNumber(e.target.value)}
        type={"text"}
        placeholder={"Enter Serial No"}
        disabled={user?.role === "admin" ? true : false}
      />
      <FormInput
        title={"Worker ID"}
        admin
        type={"text"}
        value={workerId}
        onchange={(e) => setWorkerId(e.target.value)}
        placeholder={"Enter Worker ID"}
        disabled={user?.role === "admin" ? true : false}
      />
      <FormInput
        title={"Mac Address"}
        admin
        value={macAddress}
        onchange={(e) => setMacAddress(e.target.value)}
        type={"text"}
        placeholder={"Enter Mac Address"}
        disabled={user?.role === "admin" ? true : false}
      />

      <FormInput
        title={"Actual Location"}
        admin
        value={actualLocation}
        onchange={(e) => setActualLocation(e.target.value)}
        type={"text"}
        placeholder={"Enter Actual Location"}
        disabled={user?.role === "admin" ? true : false}
      />
      <FormInput
        title={"Current Location"}
        admin
        value={currentLocation}
        onchange={(e) => setCurrentLocation(e.target.value)}
        type={"text"}
        placeholder={"Enter Current Location"}
      />

      <FormInput
        title={"Now Running"}
        admin
        type={"text"}
        value={temporary}
        onchange={(e) => setTemporary(e.target.value)}
        placeholder={"Enter now running"}
      />
      <div className="flex justify-end">
        <button
          onClick={handleClick}
          className="bg-homeBg p-2 px-4 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Save
        </button>
      </div>
      {editLoading && <Loading />}
      {restrictedLoading && <Loading />}
    </div>
  );
}
