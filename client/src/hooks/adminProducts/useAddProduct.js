import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useAddProduct = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const addProduct = async ({
    productName,
    productImage,
    productImagePublicId,
    manufacturerItem,
    cryptoCurrencyItem,
    hashRate,
    power,
    algorithm,
    price,
    featuredImage,
    featuredImagePublicId,
    description,
  }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/product`,
        {
          productImage,
          productName,
          productImagePublicId,
          manufacturerItem,
          cryptoCurrencyItem,
          hashRate,
          power,
          algorithm,
          price,
          featuredImage,
          featuredImagePublicId,
          description,
        },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      if (data.msg === "success") {
        toast.success("New Product added successfully");
        navigate("/admin/products");
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  return { loading, addProduct };
};

export default useAddProduct;
