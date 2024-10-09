import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useDeleteBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const deleteBlog = async ({ id }) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${BASE_URL}/admin/blogs/${id}`, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.msg === "success") {
        toast.success("blog deleted");
        navigate("/admin/blogs");
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
  return { loading, deleteBlog };
};

export default useDeleteBlog;
