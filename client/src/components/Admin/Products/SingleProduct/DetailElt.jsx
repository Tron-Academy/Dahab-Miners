import React from "react";

export default function DetailElt({ title, value }) {
  return (
    <div className="flex gap-3 items-center">
      <p className="min-w-32 text-xl font-semibold">{title}</p>
      <p>:</p>
      <p>{value}</p>
    </div>
  );
}
