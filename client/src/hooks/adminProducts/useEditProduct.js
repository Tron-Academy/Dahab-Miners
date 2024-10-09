import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constants";

const useEditProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const editProduct = async ({
    id,
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
      const res = await axios.patch(
        `${BASE_URL}/admin/product/${id}`,
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
        toast.success("product updated successfully");
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
  return { loading, editProduct };
};

export default useEditProduct;
