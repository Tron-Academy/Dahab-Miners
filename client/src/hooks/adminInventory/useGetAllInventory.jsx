import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetAllInventory = ({ search, type }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const getItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/inventory`, {
        params: {
          search,
          type,
        },
        withCredentials: true,
      });
      const data = response.data;
      setItems(data);
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const refetch = () => {
    getItems();
  };

  return { loading, items, refetch };
};

export default useGetAllInventory;
