import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetDashboardStats = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(0);
  const [blogs, setBlogs] = useState(0);
  const getDashboardStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/dashboard/stats`, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.msg === "success") {
        setProducts(data.products);
        setBlogs(data.blogs);
      } else {
        console.log(data.msg);
      }
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  return { loading, products, blogs };
};

export default useGetDashboardStats;
