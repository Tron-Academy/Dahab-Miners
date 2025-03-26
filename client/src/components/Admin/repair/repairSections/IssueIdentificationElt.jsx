import React from "react";
import FormSelect from "../../../FormSelect";
import { IoTrashBinOutline } from "react-icons/io5";

export default function IssueIdentificationElt({
  issueDetail,
  index,
  handleChange,
  handleRemove,
}) {
  return (
    <div className="bg-gray-200 p-5 rounded-lg my-5">
      <FormSelect
        title={"Problem Identified"}
        list={["Problem-1", "Problem-2", "Problem-3", "Problem-4", "Problem-5"]}
        value={issueDetail?.problem}
        onchange={(e) => handleChange(index, "problem", e.target.value)}
        issue
      />
      <FormSelect
        title={"Component Needed"}
        list={["Component-1", "Component-2", "Component-3", "Component-4"]}
        value={issueDetail?.component}
        onchange={(e) => handleChange(index, "component", e.target.value)}
        issue
      />
      {index > 0 && (
        <button
          className="text-red-800 text-2xl"
          onClick={() => handleRemove(index)}
        >
          <IoTrashBinOutline />
        </button>
      )}
    </div>
  );
}
