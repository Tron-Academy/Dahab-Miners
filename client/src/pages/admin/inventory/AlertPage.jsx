import React from "react";
import AlertElement from "../../../components/Admin/inventory/alert/AlertElement";

export default function AlertPage() {
  return (
    <div>
      <h2 className="md:text-2xl text-lg my-2">Restock Alerts</h2>
      <div className="my-10">
        <AlertElement />
      </div>
    </div>
  );
}
