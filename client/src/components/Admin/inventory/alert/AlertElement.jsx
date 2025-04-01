import React from "react";

export default function AlertElement({
  item,
  location,
  number,
  value,
  onChange,
}) {
  const options = ["Pending", "Approve", "Ignore"];
  return (
    <div className="bg-white p-5 rounded-md flex flex-col gap-3">
      <p>{`Low Stock: ${item} on ${location} is on low stock`}</p>
      <p>{`Items Remaining: ${number}`}</p>
      <select className={`bg-gray-200 p-2 rounded-md outline-none`}>
        {options.map((x, index) => (
          <option key={index}>{x}</option>
        ))}
      </select>
    </div>
  );
}
