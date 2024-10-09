import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetFeaturedProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getFeaturedProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/users/product/featured`, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.msg === "success") {
        setProducts(data.products);
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
    getFeaturedProducts();
  }, []);

  return { loading, products };
};

export default useGetFeaturedProducts;
