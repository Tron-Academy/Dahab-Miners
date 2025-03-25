import React, { useState } from "react";
import FormInput from "../../../FormInput";

export default function AddRepairMinerForm() {
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [owner, setOwner] = useState("");
  const [nowRunning, setNowRunning] = useState("");
  return (
    <div className="my-10">
      <FormInput
        type={"text"}
        placeholder={"Enter serial Number"}
        admin
        value={serialNumber}
        onchange={(e) => setSerialNumber(e.target.value)}
        title={"Serial Number"}
      />
      <FormInput
        type={"text"}
        placeholder={"Enter Mac Address"}
        admin
        title={"Mac Address"}
        value={macAddress}
        onchange={(e) => setMacAddress(e.target.value)}
      />
      <FormInput
        type={"text"}
        placeholder={"Enter WorkerId"}
        admin
        title={"Worker ID"}
        value={workerId}
        onchange={(e) => setWorkerId(e.target.value)}
      />
      <FormInput
        type={"text"}
        placeholder={"Enter Owner Name"}
        admin
        title={"Owner"}
        value={owner}
        onchange={(e) => setOwner(e.target.value)}
      />
      <FormInput
        type={"text"}
        placeholder={"Enter Now Running For"}
        admin
        title={"Now Running For"}
        value={nowRunning}
        onchange={(e) => setNowRunning(e.target.value)}
      />
      <div className="flex justify-end">
        <button className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white">
          Save
        </button>
      </div>
    </div>
  );
}
