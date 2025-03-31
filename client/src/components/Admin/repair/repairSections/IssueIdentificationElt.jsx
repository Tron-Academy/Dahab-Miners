import React from "react";
import FormSelect from "../../../FormSelect";
import { IoTrashBinOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function IssueIdentificationElt({
  issueDetail,
  index,
  handleChange,
  handleRemove,
  miner,
}) {
  const { user } = useSelector((state) => state.user);
  const components = [
    { component: "Component 1", stock: 0 },
    { component: "Component 2", stock: 2 },
    { component: "Component 3", stock: 3 },
    { component: "Component 4", stock: 4 },
    { component: "Component 5", stock: 5 },
    { component: "Component 6", stock: 6 },
    { component: "Component 7", stock: 7 },
  ];
  return (
    <div className="bg-gray-200 p-5 rounded-lg my-5">
      <FormSelect
        title={"Problem Identified"}
        list={["Problem-1", "Problem-2", "Problem-3", "Problem-4", "Problem-5"]}
        value={issueDetail?.problem}
        disabled={
          (miner?.status === "Need Repair" ||
            miner?.status === "Need Testing" ||
            miner?.status === "Ready To Connect") &&
          user.role === "admin"
        }
        onchange={(e) => handleChange(index, "problem", e.target.value)}
        issue
      />
      {/* <FormSelect
        title={"Component Needed"}
        list={["Component-1", "Component-2", "Component-3", "Component-4"]}
        value={issueDetail?.component}
        onchange={(e) => handleChange(index, "component", e.target.value)}
        issue
      /> */}
      <div className="form-row">
        <label htmlFor="status" className="form-label">
          Component Needed
        </label>
        <div className="flex items-center">
          <select
            id="status"
            value={issueDetail?.component}
            onChange={(e) => handleChange(index, "component", e.target.value)}
            disabled={
              (miner?.status === "Need Repair" ||
                miner?.status === "Need Testing" ||
                miner?.status === "Ready To Connect") &&
              user.role === "admin"
            }
            className={`w-full py-1 px-3 rounded-lg bg-transparent border border-[#0B578E] outline-none  text-black`}
          >
            <option
              className="border-b py-1 border-gray-300 bg-[#CCF2FF] text-black"
              value={"No Components needed"}
            >
              No Components needed
            </option>
            {components?.map((item, index) => (
              <option
                className="border-b py-1 border-gray-300 bg-[#CCF2FF] text-black"
                key={index}
                value={`${item.component} | ${item.stock} nos`}
              >
                {`${item.component} | ${item.stock} nos`}
              </option>
            ))}
          </select>
        </div>
      </div>
      {index > 0 && (
        <button
          className="text-red-800 text-2xl disabled:cursor-not-allowed"
          onClick={() => handleRemove(index)}
          disabled={
            (miner?.status === "Need Repair" ||
              miner?.status === "Need Testing" ||
              miner?.status === "Ready To Connect") &&
            user.role === "admin"
          }
        >
          <IoTrashBinOutline />
        </button>
      )}
    </div>
  );
}
