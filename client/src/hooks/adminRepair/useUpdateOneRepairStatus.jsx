import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useUpdateOneRepairStatus = () => {
  const [loading, setLoading] = useState(false);
  const updateStatus = async ({ id, problemId, repairStatus }) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/repair/updateStatus/${id}`,
        { problemId, repairStatus },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data.msg === "success") {
        toast.success("updated successfully");
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

  return { loading, updateStatus };
};

export default useUpdateOneRepairStatus;
