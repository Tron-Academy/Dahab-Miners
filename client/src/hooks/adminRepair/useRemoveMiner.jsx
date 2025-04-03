import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useRemoveMiner = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const removeMiner = async ({ id }) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}/admin/repair/${id}`, {
        withCredentials: true,
      });
      const data = response.data;
      if (data.msg === "success") {
        toast.success("Removed successfully");
        navigate("/admin/repair");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, removeMiner };
};

export default useRemoveMiner;
