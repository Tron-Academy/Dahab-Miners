import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

function useTotalAlerts() {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getTotal = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/alerts/count`, {
        withCredentials: true,
      });
      const data = response.data;
      setTotal(data.total);
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  return { loading, total };
}

export default useTotalAlerts;
