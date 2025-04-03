import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useUpdateRepairProcess = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateProcess = async ({ id }) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/repair/updateStatus`,
        { id },
        { withCredentials: true }
      );
      const data = response.data;
      if (data.msg === "success") {
        toast.success("updated successfully");
        navigate("/admin/repair");
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

  return { loading, updateProcess };
};

export default useUpdateRepairProcess;
