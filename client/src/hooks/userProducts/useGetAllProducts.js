import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetAllProducts = ({
  keyWord,
  cryptoCurrencyOption,
  manufacturerOptions,
  sortby,
  currentPage,
}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(0);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/users/product`, {
        params: {
          keyWord,
          cryptoCurrencyOption,
          manufacturerOptions,
          sortby,
          currentPage,
        },
        withCredentials: true,
      });
      const data = res.data;
      if (data.msg === "success") {
        setProducts(data.products);
        setPages(data.numOfPages);
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
    getAllProducts();
  }, []);

  const refetch = () => {
    getAllProducts();
  };

  return { loading, refetch, products, pages };
};

export default useGetAllProducts;
