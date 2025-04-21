import React from "react";
import FormSelect from "../../../FormSelect";
import { IoTrashBinOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import useGetAvailableParts from "../../../../hooks/adminRepair/useGetAvailableParts";
import Loading from "../../../Loading";
import FormInput from "../../../FormInput";
import useGetAvailableQuantity from "../../../../hooks/adminRepair/useGetAvailableQuantity";

export default function IssueIdentificationElt({
  issueDetail,
  index,
  handleChange,
  handleRemove,
  miner,
}) {
  const { user } = useSelector((state) => state.user);
  const { loading, components } = useGetAvailableParts();
  const { refetch, qty } = useGetAvailableQuantity();

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
            onChange={(e) => {
              handleChange(index, "component", e.target.value);
              refetch(e.target.value);
            }}
            disabled={
              (miner?.status === "Need Repair" ||
                miner?.status === "Need Testing" ||
                miner?.status === "Ready To Connect") &&
              user.role === "admin"
            }
            className={`w-full py-1 px-3 h-11 rounded-lg bg-white border border-[#0B578E] outline-none  text-black`}
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
                value={item.itemName}
              >
                {item.itemName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="status" className="form-label">
          Quantity
        </label>

        <div className="flex items-center">
          <select
            id="status"
            value={issueDetail?.qty}
            onChange={(e) => {
              handleChange(index, "qty", e.target.value);
            }}
            disabled={
              (miner?.status === "Need Repair" ||
                miner?.status === "Need Testing" ||
                miner?.status === "Ready To Connect") &&
              user.role === "admin"
            }
            className={`w-full py-1 px-3 h-11 rounded-lg bg-white border border-[#0B578E] outline-none  text-black`}
          >
            <option
              className="border-b py-1 border-gray-300 bg-[#CCF2FF] text-black"
              value={0}
            >
              0
            </option>
            {Array.from(
              {
                length:
                  miner?.status === "Need Repair" ||
                  miner?.status === "Need Testing" ||
                  miner?.status === "Ready To Connect"
                    ? issueDetail?.qty
                    : qty,
              },
              (_, i) => i + 1
            ).map((item, index) => (
              <option
                className="border-b py-1 border-gray-300 bg-[#CCF2FF] text-black"
                key={index}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* <FormSelect
        title={"Quantity required"}
        list={Array.from({ length: qty }, (_, i) => i + 1)}
        value={issueDetail?.qty}
        disabled={
          (miner?.status === "Need Repair" ||
            miner?.status === "Need Testing" ||
            miner?.status === "Ready To Connect") &&
          user.role === "admin"
        }
        issue
        onchange={(e) => handleChange(index, "qty", e.target.value)}
      /> */}
      <FormSelect
        title={"Technician"}
        list={["Technician-1", "Technician-2", "Technician-3"]}
        disabled={
          (miner?.status === "Need Repair" ||
            miner?.status === "Need Testing" ||
            miner?.status === "Ready To Connect") &&
          user.role === "admin"
        }
        value={issueDetail?.identifyTechnician}
        onchange={(e) =>
          handleChange(index, "identifyTechnician", e.target.value)
        }
        issue
      />
      <FormInput
        title={"Remarks"}
        type={"text"}
        admin
        disabled={
          (miner?.status === "Need Repair" ||
            miner?.status === "Need Testing" ||
            miner?.status === "Ready To Connect") &&
          user.role === "admin"
        }
        value={issueDetail?.issueRemark}
        onchange={(e) => handleChange(index, "issueRemark", e.target.value)}
      />
      {(miner?.status === "Need Repair" ||
        miner?.status === "Need Testing" ||
        miner?.status === "Ready To Connect") && (
        <p className="mb-2">{`last updated : ${issueDetail?.issueUpdatedOn
          .toString()
          .slice(0, 10)} at ${issueDetail?.issueUpdatedOn
          .toString()
          .slice(14, 19)}`}</p>
      )}
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
