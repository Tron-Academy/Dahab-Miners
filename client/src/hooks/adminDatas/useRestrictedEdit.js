import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constants";

const useRestrictedEdit = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const EditRestrictedData = async ({ id, currentLocation, temporary }) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/data/updateRestricted/${id}`,
        {
          currentLocation,
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

  return { loading, EditRestrictedData };
};

export default useRestrictedEdit;
