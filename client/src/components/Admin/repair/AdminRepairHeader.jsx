import React from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminRepairHeader() {
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
        <button className="px-4 py-2 w-fit rounded-md bg-homeBg text-white hover:bg-homeBgGradient">
          Remove Connected Miner
        </button>
      </div>
      <div className="flex gap-3 my-3">
        <input
          type="text"
          placeholder="search..."
          className="p-2 rounded-md w-fit outline-none"
        />
        <button className="bg-homeBg hover:bg-homeBgGradient text-white px-3 rounded-md text-xl">
          <CiSearch />
        </button>
      </div>
    </div>
  );
}
