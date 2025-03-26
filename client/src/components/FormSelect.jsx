import React from "react";

function FormSelect({ title, value, onchange, list, multi, issue }) {
  return (
    <div className="form-row">
      <label htmlFor="status" className="form-label">
        {title}
      </label>
      <div className="flex items-center">
        <select
          id="status"
          value={value}
          multiple={multi ? true : false}
          onChange={onchange}
          className={`w-full py-1 px-3 rounded-lg bg-transparent border border-[#0B578E] outline-none ${
            multi ? "h-40" : "h-11"
          } ${issue ? "text-black" : "text-[#CCF2FF]"}`}
        >
          {list?.map((item) => (
            <option
              className="border-b py-1 border-gray-300 bg-[#CCF2FF] text-black"
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FormSelect;
