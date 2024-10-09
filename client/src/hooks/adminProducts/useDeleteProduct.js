import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${BASE_URL}/admin/product/${id}`, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.msg === "success") {
        toast.success("product deleted");
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
  return { loading, deleteProduct };
};

export default useDeleteProduct;
