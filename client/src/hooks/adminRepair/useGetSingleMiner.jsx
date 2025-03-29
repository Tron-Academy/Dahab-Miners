import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetSingleMiner = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [miner, setMiner] = useState(null);

  const getSingleMiner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/repair/${id}`, {
        withCredentials: true,
      });
      const data = response.data;

      setMiner(data);
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleMiner();
  }, []);

  const refetch = () => {
    getSingleMiner();
  };

  return { loading, miner, refetch };
};

export default useGetSingleMiner;
