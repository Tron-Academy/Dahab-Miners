import React from "react";

export default function DashboardDetailBox({ title, value }) {
  return (
    <div className="bg-btnGreen p-3 rounded-lg flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
}
