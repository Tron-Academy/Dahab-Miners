import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetRelatedMiner = ({ serialNumber }) => {
  const [loading, setLoading] = useState(false);
  const [miner, setMiner] = useState(null);

  const relatedMiner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/repair/related`, {
        params: {
          serialNumber,
        },
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
    relatedMiner();
  }, []);

  const refetch = () => {
    relatedMiner();
  };

  return { loading, miner, refetch };
};

export default useGetRelatedMiner;
