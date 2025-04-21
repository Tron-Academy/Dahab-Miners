import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetAvailableQuantity = () => {
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(null);

  const getQty = async (component) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/repair/qty`, {
        params: { component },
        withCredentials: true,
      });
      const data = response.data;
      setQty(data);
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
      setQty(0);
    } finally {
      setLoading(false);
    }
  };

  const refetch = (component) => {
    getQty(component);
  };

  return { loading, refetch, qty };
};

export default useGetAvailableQuantity;
