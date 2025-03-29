import React from "react";
import Section2RepairElt from "./Section2RepairElt";
import { toast } from "react-toastify";
import useUpdateRepairProcess from "../../../../hooks/adminRepair/useUpdateRepairProcess";
import Loading from "../../../Loading";
import { useSelector } from "react-redux";

export default function Section2Content({ miner }) {
  const { loading, updateProcess } = useUpdateRepairProcess();
  const { user } = useSelector((state) => state.user);
  function handleUpdate() {
    const isFull = miner?.problems?.filter(
      (item) => item.issueStatus === "Repair Done"
    );
    if (isFull.length === miner?.problems?.length) {
      updateProcess({ id: miner?._id });
    } else {
      toast.warn("Cannot update untill all miners are done repairing");
    }
  }
  return (
    <div className="p-5 bg-white rounded-md">
      <h2 className="text-2xl mb-5 font-semibold">Repair Process</h2>
      {miner?.problems?.length > 0 &&
        miner?.problems.map((x) => (
          <Section2RepairElt
            key={x._id}
            item={x}
            minerId={miner._id}
            minerStatus={miner.status}
          />
        ))}
      <div className="flex justify-end">
        <button
          className="px-4 py-2 rounded-md text-white bg-homeBg hover:bg-homeBgGradient disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleUpdate}
          disabled={miner?.status === "Need Testing" && user?.role === "admin"}
        >
          Update
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
}
