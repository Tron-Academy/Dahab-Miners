import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useRemoveFeatured = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const removeFeatured = async (id) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/product/remove-featured`,
        { id },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.msg === "success") {
        toast.success("Removed featured");
        // navigate("/admin/products");
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
  return { loading, removeFeatured };
};

export default useRemoveFeatured;
