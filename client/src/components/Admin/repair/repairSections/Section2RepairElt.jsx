import React, { useEffect, useState } from "react";
import useUpdateOneRepairStatus from "../../../../hooks/adminRepair/useUpdateOneRepairStatus";
import { useDispatch, useSelector } from "react-redux";
import { setRefetchTrigger } from "../../../../slices/adminSlice";
import Loading from "../../../Loading";

const options = ["Pending", "Repair Done", "Component Needed"];

export default function Section2RepairElt({ item, minerId, minerStatus }) {
  const [repairStatus, setRepairStatus] = useState("Pending");
  const { user } = useSelector((state) => state.user);
  const { loading, updateStatus } = useUpdateOneRepairStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    if (item?.issueStatus) {
      setRepairStatus(item.issueStatus);
    }
  }, [item]);
  return (
    <div className="flex sm:flex-row flex-col justify-between gap-5 sm:items-center bg-gray-200 p-5 rounded-lg my-5">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xl">Problem</p>
          <p>{item?.problem}</p>
        </div>
        <div>
          <p className="text-xl">Component</p>
          <p>{item?.component}</p>
        </div>
        <div>
          <p className="text-xl">Quantity</p>
          <p>{item?.qty}</p>
        </div>
        {item?.issueStatus !== "Pending" && (
          <p>{`Last Updated : ${item?.repairUpdatedOn.toString()}`}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm">Repair Status</label>
        <select
          value={repairStatus}
          onChange={(e) => setRepairStatus(e.target.value)}
          disabled={
            (minerStatus === "Need Testing" ||
              minerStatus === "Ready To Connect") &&
            user?.role === "admin"
          }
          className="py-1 px-3 rounded-lg bg-transparent border border-[#0B578E] outline-none  text-black"
        >
          {options.map((item, index) => (
            <option
              key={index}
              className="border-b py-1 border-gray-300 bg-[#CCF2FF] text-black"
            >
              {item}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={async () => {
            await updateStatus({
              id: minerId,
              problemId: item?._id,
              repairStatus: repairStatus,
            });
            dispatch(setRefetchTrigger());
          }}
          disabled={
            (minerStatus === "Need Testing" ||
              minerStatus === "Ready To Connect") &&
            user?.role === "admin"
          }
        >
          Save
        </button>
        {loading && <Loading />}
      </div>
    </div>
  );
}
