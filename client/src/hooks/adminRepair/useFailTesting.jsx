import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useFailTesting = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const failTesting = async ({
    id,
    logImageUrl,
    logImagePublicId,
    remarks,
  }) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/repair/test-fail/${id}`,
        { logImagePublicId, logImageUrl, remarks },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data.msg === "success") {
        toast.success("updated successfully");
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
  return { loading, failTesting };
};

export default useFailTesting;
