import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetRelatedBlogs = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const getRelatedBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/users/blogs/related/${id}`, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.msg === "success") {
        setBlogs(data.blogs);
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
    getRelatedBlogs();
  }, []);
  const refetch = () => {
    getRelatedBlogs();
  };
  return { loading, blogs, refetch };
};

export default useGetRelatedBlogs;
