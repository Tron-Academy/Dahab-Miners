import React, { useEffect, useState } from "react";

export default function AlertElement({ alert }) {
  const options = ["Pending", "Approve", "Ignore"];
  const [status, setStatus] = useState("Pending");
  useEffect(() => {
    if (alert) {
      setStatus(alert.status);
    }
  }, [alert]);
  return (
    <div className="bg-white p-5 rounded-md flex flex-col gap-3">
      <p className="text-lg font-semibold">{alert.alertItem}</p>
      <p className="font-semibold">Current Stock: {alert.currentStock}</p>
      <p className="font-semibold">{alert.message}</p>
      <select
        className={`bg-gray-200 p-2 rounded-md outline-none`}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {options.map((x, index) => (
          <option key={index}>{x}</option>
        ))}
      </select>
    </div>
  );
}
