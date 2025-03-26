import React, { useState } from "react";
import DetailElt from "../../Products/SingleProduct/DetailElt";
import IssueIdentificationElt from "./IssueIdentificationElt";

export default function Section1Content() {
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
      { problem: "Problem-1", component: "Component-1" },
    ]);
  }

  function removeForm(index) {
    const updated = issueDetail.filter((_, i) => i !== index);
    setIssueDetail(updated);
  }
  return (
    <div className="p-5 bg-white rounded-md">
      <div className="flex flex-col gap-5">
        <DetailElt title={"Serial No"} value={"454657886655"} />
        <DetailElt title={"Mac Address"} value={"454657886655"} />
        <DetailElt title={"Worker ID"} value={"454657886655"} />
        <DetailElt title={"Owner"} value={"454657886655"} />
        <DetailElt title={"Now Running"} value={"454657886655"} />
      </div>
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
    </div>
  );
}
