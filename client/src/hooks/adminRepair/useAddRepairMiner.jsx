import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useAddRepairMiner = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addMiner = async ({
    serialNumber,
    macAddress,
    workerId,
    owner,
    nowRunning,
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/repair/add`,
        {
          serialNumber,
          macAddress,
          workerId,
          owner,
          nowRunning,
        },
        { withCredentials: true }
      );
      const data = response.data;
      if (data.msg === "success") {
        toast.success("Successfully added");
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
  return { loading, addMiner };
};

export default useAddRepairMiner;
