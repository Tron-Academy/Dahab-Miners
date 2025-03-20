import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setCurrentPage,
  setFarm,
  setRefetchTrigger,
  setSearch,
  setSortData,
} from "../../../slices/adminSlice";

export default function DataPageHeader() {
  const { search, farm } = useSelector((state) => state.admin);
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
          <label>Search Keyword:</label>
          <input
            type="text"
            className="bg-neutral-300 p-2 rounded-md outline-none"
            placeholder="Enter Search Keyword"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label>Farm Location:</label>
          <select
            value={farm}
            onChange={(e) => dispatch(setFarm(e.target.value))}
            className={`bg-neutral-300 p-2 rounded-md outline-none`}
          >
            {[
              "ALL",
              "SHAKABOUT",
              "AL FALAH",
              "MBZ",
              "BAHYA",
              "ADLA",
              "SWEIHAN",
              "LIWA 3",
              "LIWA 4",
              "LIWA 1",
              "BADA ZAYED",
              "BAHYA STORAGE",
              "LIWA OFFICE",
            ].map((x, i) => (
              <option key={i}>{x}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 items-end justify-start">
          <button
            onClick={() => {
              dispatch(setCurrentPage(1));
              dispatch(setRefetchTrigger());
            }}
            className="bg-homeBg text-white px-5 py-2 rounded-lg hover:bg-homeBgGradient nav-link"
          >
            Search
          </button>
          <button
            onClick={() => {
              dispatch(setFarm("ALL"));
              dispatch(setSearch(""));
              dispatch(setCurrentPage(1));
              dispatch(setSortData("new"));
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
