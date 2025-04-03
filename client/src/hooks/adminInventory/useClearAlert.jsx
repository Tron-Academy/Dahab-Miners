import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useClearAlert = () => {
  const [loading, setLoading] = useState(false);

  const clearAlert = async ({ id }) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}/admin/alerts/${id}`, {
        withCredentials: true,
      });
      const data = response.data;
      if (data.msg === "success") {
        toast.success("Successfully deleted");
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
  return { loading, clearAlert };
};

export default useClearAlert;
