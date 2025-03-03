import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetData = ({ mac, client, serial, currentPage }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/data/getData`, {
        withCredentials: true,
        params: {
          mac,
          client,
          serial,
          currentPage,
        },
      });
      const data = res.data;
      setData(data.datas);
      setPages(data.numOfPages);
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

  return { loading, data, refetch, pages };
};

export default useGetData;
