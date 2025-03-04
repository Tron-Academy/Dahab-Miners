import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useEditData = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const editData = async ({
    id,
    clientName,
    serialNumber,
    modelName,
    macAddress,
    actualLocation,
    currentLocation,
    workerId,
    temporary,
  }) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/data/updateData/${id}`,
        {
          clientName,
          serialNumber,
          modelName,
          macAddress,
          actualLocation,
          currentLocation,
          workerId,
          temporary,
        },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.msg === "success") {
        toast.success("data updated successfully");
        navigate("/admin/data");
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

  return { loading, editData };
};

export default useEditData;
