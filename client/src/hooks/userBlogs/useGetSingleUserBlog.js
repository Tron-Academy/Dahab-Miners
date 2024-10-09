import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetSingleUserBlog = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const getSingleUserBlog = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/users/blogs/${id}`, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.msg === "success") {
        setBlog(data.blog);
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
    getSingleUserBlog();
  }, []);

  const refetch = () => {
    getSingleUserBlog();
  };
  return { loading, blog, refetch };
};

export default useGetSingleUserBlog;
