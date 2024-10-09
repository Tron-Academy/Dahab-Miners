import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const useGetUserBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const getAllUserBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/users/blogs`, {
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
    getAllUserBlogs();
  }, []);
  return { loading, blogs };
};

export default useGetUserBlogs;
