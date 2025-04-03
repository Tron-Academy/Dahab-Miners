import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useUpdateRestock = () => {
  const [loading, setLoading] = useState(false);
  const updateRestock = async ({ id, status }) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/alerts`,
        {
          id,
          status,
        },
        { withCredentials: true }
      );
      const data = response.data;
      if (data.msg === "success") {
        toast.success("Updated successfully");
      }
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateRestock };
};

export default useUpdateRestock;
