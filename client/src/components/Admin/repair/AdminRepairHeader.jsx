import React from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setRefetchTrigger } from "../../../slices/adminSlice";

export default function AdminRepairHeader({ search, setSearch }) {
  const dispatch = useDispatch();
  return (
    <div>
      <h2 className="md:text-2xl text-lg my-2">Repair Dashboard</h2>
      <div className="flex flex-col gap-3 my-3 items-end">
        <Link
          to={"/admin/repair/new"}
          className="px-4 py-2 w-fit rounded-md bg-homeBg text-white hover:bg-homeBgGradient"
        >
          Add New Miner
        </Link>
        <Link
          to={"/admin/repair/remove"}
          className="px-4 py-2 w-fit rounded-md bg-homeBg text-white hover:bg-homeBgGradient"
        >
          Remove Connected Miner
        </Link>
      </div>
      <div className="flex gap-3 my-3">
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md w-fit outline-none"
        />
        <button
          className="bg-homeBg hover:bg-homeBgGradient text-white px-3 rounded-md text-xl"
          onClick={() => dispatch(setRefetchTrigger())}
        >
          <CiSearch />
        </button>
        <button
          className="bg-homeBg hover:bg-homeBgGradient text-white px-3 rounded-md"
          onClick={() => {
            setSearch("");
            dispatch(setRefetchTrigger());
          }}
        >
          clear
        </button>
      </div>
    </div>
  );
}
