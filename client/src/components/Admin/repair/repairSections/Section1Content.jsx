import React, { useState } from "react";
import DetailElt from "../../Products/SingleProduct/DetailElt";
import IssueIdentificationElt from "./IssueIdentificationElt";
import Loading from "../../../Loading";
import useAddIssue from "../../../../hooks/adminRepair/useAddIssue";
import { useParams } from "react-router-dom";

export default function Section1Content({ miner, loading }) {
  const { id } = useParams();
  const { loading: addLoading, addIssue } = useAddIssue();
  const [issueDetail, setIssueDetail] = useState([
    {
      problem: "Problem-1",
      component: "Component-1",
    },
  ]);

  function handleChange(index, field, value) {
    const newIssueDetail = [...issueDetail];
    newIssueDetail[index] = {
      ...newIssueDetail[index],
      [field]: value,
    };
    setIssueDetail(newIssueDetail);
  }

  function addNewForm() {
    setIssueDetail([
      ...issueDetail,
      { problem: "Problem-1", component: "Component 1" },
    ]);
  }

  function removeForm(index) {
    const updated = issueDetail.filter((_, i) => i !== index);
    setIssueDetail(updated);
  }
  return (
    <div className="p-5 bg-white rounded-md">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5">
          <DetailElt title={"Serial No"} value={miner?.serialNumber} />
          <DetailElt title={"Mac Address"} value={miner?.macAddress} />
          <DetailElt title={"Worker ID"} value={miner?.workerId} />
          <DetailElt title={"Owner"} value={miner?.owner} />
          <DetailElt title={"Now Running"} value={miner?.nowRunning} />
        </div>
      )}

      {issueDetail.map((x, index) => (
        <IssueIdentificationElt
          key={index}
          issueDetail={x}
          index={index}
          handleChange={handleChange}
          handleRemove={removeForm}
        />
      ))}

      <div>
        <button
          className="px-4 py-2 bg-homeBg hover:bg-homeBgGradient rounded-md text-white"
          onClick={() => addNewForm()}
        >
          Add New Issue
        </button>
      </div>
      <div className="my-5 flex justify-end">
        <button
          className="px-4 py-2 bg-homeBg hover:bg-homeBgGradient rounded-md text-white"
          onClick={() => addIssue({ id, issues: issueDetail })}
        >
          Update
        </button>
      </div>
      {addLoading && <Loading />}
    </div>
  );
}
