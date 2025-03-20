import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetData = ({ search, farm, currentPage, limit, sortData }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [count, setCount] = useState(0);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/data/getData`, {
        withCredentials: true,
        params: {
          search,
          farm,
          currentPage,
          limit,
          sortby: sortData,
        },
      });
      const data = res.data;
      setData(data.datas);
      setPages(data.numOfPages);
      setCount(data.totalDatas);
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

  return { loading, data, refetch, pages, count };
};

export default useGetData;
