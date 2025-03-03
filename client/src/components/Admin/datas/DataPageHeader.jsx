import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setRefetchTrigger } from "../../../slices/adminSlice";

export default function DataPageHeader({
  mac,
  client,
  serial,
  setMac,
  setClient,
  setSerial,
}) {
  const dispatch = useDispatch();
  return (
    <div>
      <h4 className="md:text-2xl text-lg my-2">All Datas</h4>
      <div className="flex justify-end">
        <Link
          to={"/admin/data/new"}
          className="bg-homeBg text-white px-5 py-2 rounded-lg hover:bg-homeBgGradient nav-link"
        >
          Add New Data
        </Link>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 px-5 py-7 bg-white my-5 rounded-lg">
        <div className="flex flex-col gap-3">
          <label>Mac Id:</label>
          <input
            type="text"
            className="bg-neutral-300 p-2 rounded-md outline-none"
            placeholder="Enter Model No"
            value={mac}
            onChange={(e) => setMac(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Serial No:</label>
          <input
            type="text"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            className="bg-neutral-300 p-2 rounded-md outline-none"
            placeholder="Enter Serial No"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Client Name:</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="bg-neutral-300 p-2 rounded-md outline-none"
            placeholder="Enter Client Name"
          />
        </div>
        <div className="flex gap-3 items-end justify-end">
          <button
            onClick={() => dispatch(setRefetchTrigger())}
            className="bg-homeBg text-white px-5 py-2 rounded-lg hover:bg-homeBgGradient nav-link"
          >
            Search
          </button>
          <button
            onClick={() => {
              setClient("");
              setMac("");
              setSerial("");
              dispatch(setRefetchTrigger());
            }}
            className="bg-homeBg text-white px-5 py-2 rounded-lg hover:bg-homeBgGradient nav-link"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
