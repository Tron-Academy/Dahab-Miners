import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useAddNewData = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addNewData = async ({
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
      const res = await axios.post(
        `${BASE_URL}/admin/data/addData`,
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
        toast.success("Data Added Successfully");
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

  return { loading, addNewData };
};

export default useAddNewData;
