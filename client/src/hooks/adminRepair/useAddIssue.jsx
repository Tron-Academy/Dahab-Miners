import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useAddIssue = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addIssue = async ({ id, issues }) => {
    setLoading(true);

    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/repair/issues/${id}`,
        {
          issues,
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

  return { loading, addIssue };
};

export default useAddIssue;
