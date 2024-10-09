import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetAllAdminProducts = ({ keyWord }) => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const getAllAdminProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/product`, {
        params: {
          keyWord,
        },
        withCredentials: true,
      });
      const data = res.data;
      if (data.msg === "success") {
        setAllProducts(data.products);
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
    getAllAdminProducts();
  }, []);

  const refetch = () => {
    getAllAdminProducts();
  };
  return { loading, allProducts, refetch };
};

export default useGetAllAdminProducts;
