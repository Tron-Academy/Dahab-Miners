import React, { useEffect, useState } from "react";
import FormInput from "../../../FormInput";
import ProductImageUpload from "../../Products/ProductImageUpload";

const options = ["To Be Tested", "Test Passed", "Test Failed"];

export default function Section3Content({ miner }) {
  const [testStatus, setTestStatus] = useState("To Be Tested");

  useEffect(() => {}, []);
  return (
    <div className="p-5 bg-white rounded-md">
      <h2 className="text-2xl mb-5 font-semibold">Testing Process</h2>
      <div className="flex flex-col gap-2 bg-gray-200 p-5 rounded-lg my-5">
        <label className="text-sm">Repair Status</label>
        <select
          value={testStatus}
          onChange={(e) => setTestStatus(e.target.value)}
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
        <ProductImageUpload title={"Add Log"} />
        <FormInput type={"text"} title={"Remarks"} admin />
        <button className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white">
          Update
        </button>
      </div>
    </div>
  );
}
