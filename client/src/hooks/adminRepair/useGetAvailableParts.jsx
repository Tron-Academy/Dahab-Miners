import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetAvailableParts = () => {
  const [loading, setLoading] = useState(false);
  const [components, setComponents] = useState([]);

  const getParts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/repair/parts`, {
        withCredentials: true,
      });
      const data = response.data;
      setComponents(data);
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getParts();
  }, []);

  return { loading, components };
};

export default useGetAvailableParts;
