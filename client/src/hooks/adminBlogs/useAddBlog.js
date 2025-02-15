import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useAddBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const addBlog = async ({
    title,
    blogImage,
    blogImagePublicId,
    content,
    slug,
    metaTitle,
    metaDescription,
    metaKeywords,
  }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/blogs`,
        {
          title,
          blogImage,
          blogImagePublicId,
          content,
          slug,
          metaTitle,
          metaDescription,
          metaKeywords,
        },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.msg === "success") {
        toast.success("New Product added successfully");
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
  return { loading, addBlog };
};

export default useAddBlog;
