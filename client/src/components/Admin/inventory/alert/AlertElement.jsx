import React, { useEffect, useState } from "react";
import useUpdateRestock from "../../../../hooks/adminInventory/useUpdateRestock";
import Loading from "../../../Loading";
import { useDispatch } from "react-redux";
import { setRefetchTrigger } from "../../../../slices/adminSlice";
import useClearAlert from "../../../../hooks/adminInventory/useClearAlert";

export default function AlertElement({
  id,
  alertStatus,
  item,
  stock,
  message,
}) {
  const options = ["Pending", "Approve", "Ignore"];
  const [status, setStatus] = useState("Pending");
  const { loading, updateRestock } = useUpdateRestock();
  const { loading: clearLoading, clearAlert } = useClearAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (alertStatus) {
      setStatus(alertStatus);
    }
  }, [alertStatus]);
  return clearLoading ? (
    <Loading />
  ) : (
    <div className="bg-white p-5 rounded-md flex flex-col gap-3">
      <div className="flex justify-end">
        <button
          className="px-3 py-2 rounded-md text-sm bg-red-500 text-white font-semibold"
          onClick={() => {
            clearAlert({ id });
            dispatch(setRefetchTrigger());
          }}
        >
          Clear
        </button>
      </div>
      {alertStatus === "Approve" && (
        <p className="text-green-600 text-lg">Approved</p>
      )}
      {alertStatus === "Ignore" && (
        <p className="text-red-600 text-lg">Cancelled</p>
      )}
      <p className="text-lg font-semibold">{item}</p>
      <p className="font-semibold">Current Stock: {stock}</p>
      <p className="font-semibold">{message}</p>
      <select
        className={`bg-gray-200 p-2 rounded-md outline-none w-fit disabled:cursor-not-allowed`}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={alertStatus === "Approve" || alertStatus === "Ignore"}
      >
        {options.map((x, index) => (
          <option key={index}>{x}</option>
        ))}
      </select>
      <button
        onClick={() => {
          updateRestock({ id, status });
          dispatch(setRefetchTrigger());
        }}
        className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white w-fit"
      >
        Update
      </button>
      {loading && <Loading />}
    </div>
  );
}
