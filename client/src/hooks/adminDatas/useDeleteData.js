import axios from "axios";
import React, { useState } from "react";

import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useDeleteData = () => {
  const [loading, setLoading] = useState(false);

  const deleteData = async ({ id }) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${BASE_URL}/admin/data/deleteData/${id}`,
        { withCredentials: true }
      );
      const data = res.data;
      if (data.msg === "success") {
        toast.success("deleted successfully");
      }
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteData };
};

export default useDeleteData;
