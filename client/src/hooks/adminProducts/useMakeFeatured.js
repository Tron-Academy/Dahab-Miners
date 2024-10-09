import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useMakeFeatured = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const makeFeatured = async (id) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/product/make-featured`,
        { id },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.msg === "success") {
        toast.success("product is now featured");
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
  return { loading, makeFeatured };
};

export default useMakeFeatured;
