import React from "react";
import FormSelect from "../../../FormSelect";
import { IoTrashBinOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import useGetAvailableParts from "../../../../hooks/adminRepair/useGetAvailableParts";
import Loading from "../../../Loading";

export default function IssueIdentificationElt({
  issueDetail,
  index,
  handleChange,
  handleRemove,
  miner,
}) {
  const { user } = useSelector((state) => state.user);
  const { loading, components } = useGetAvailableParts();

  return loading ? (
    <Loading />
  ) : (
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
