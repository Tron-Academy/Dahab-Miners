import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetData = ({ model, client, serial }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/data/getData`, {
        withCredentials: true,
        params: {
          model,
          client,
          serial,
        },
      });
      const data = res.data;
      setData(data.datas);
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const refetch = () => {
    getData();
  };

  return { loading, data, refetch };
};

export default useGetData;
