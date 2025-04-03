import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetAllAlerts = () => {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const getAlerts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/alerts`, {
        withCredentials: true,
      });
      const data = response.data;
      setAlerts(data.alerts);
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAlerts();
  }, []);

  const refetch = () => {
    getAlerts();
  };

  return { loading, alerts, refetch };
};

export default useGetAllAlerts;
