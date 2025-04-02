import React from "react";
import AlertElement from "../../../components/Admin/inventory/alert/AlertElement";
import useGetAllAlerts from "../../../hooks/adminInventory/useGetAllAlerts";
import Loading from "../../../components/Loading";

export default function AlertPage() {
  const { loading, alerts } = useGetAllAlerts();
  return loading ? (
    <Loading />
  ) : (
    <div>
      <h2 className="md:text-2xl text-lg my-2">Restock Alerts</h2>
      <div className="my-10 flex flex-col gap-2">
        {alerts.map((alert) => (
          <AlertElement key={alert._id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
