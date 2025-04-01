import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetSingleItem = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  const getItem = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/inventory/${id}`, {
        withCredentials: true,
      });
      const data = response.data;
      setItem(data);
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return { loading, item };
};

export default useGetSingleItem;
