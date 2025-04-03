import React, { useEffect } from "react";
import AlertElement from "../../../components/Admin/inventory/alert/AlertElement";
import useGetAllAlerts from "../../../hooks/adminInventory/useGetAllAlerts";
import Loading from "../../../components/Loading";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AlertPage() {
  const { loading, alerts, refetch } = useGetAllAlerts();
  const { refetchTrigger } = useSelector((state) => state.admin);

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 1000);
  }, [refetchTrigger]);
  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className="flex justify-end">
        <Link
          to={"/admin/inventory"}
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
        >
          Go Back
        </Link>
      </div>
      <h2 className="md:text-2xl text-lg my-2">Restock Alerts</h2>
      <div className="my-10 flex flex-col gap-2">
        {alerts.map((alert) => (
          <AlertElement
            key={alert._id}
            id={alert._id}
            alertStatus={alert.status}
            item={alert.alertItem}
            stock={alert.currentStock}
            message={alert.message}
          />
        ))}
      </div>
    </div>
  );
}
