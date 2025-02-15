import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useEditBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const editBlog = async ({
    title,
    blogImage,
    blogImagePublicId,
    content,
    slug,
    metaTitle,
    metaDescription,
    metaKeywords,
    id,
  }) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/blogs/edit/${id}`,
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
        toast.success("blog updated successfully");
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
  return { loading, editBlog };
};

export default useEditBlog;
