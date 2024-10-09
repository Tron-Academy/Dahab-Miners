import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetSingleAdminProduct = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const getSingleAdminProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/product/${id}`, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.msg === "success") {
        setProduct(data.product);
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
    getSingleAdminProduct();
  }, []);

  const refetch = () => {
    getSingleAdminProduct();
  };
  return { loading, product, refetch };
};

export default useGetSingleAdminProduct;
