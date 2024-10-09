import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const forgotPassword = async ({ email }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.msg === "success") {
        toast.success("A verification code has been sent to your email");
        navigate("/auth/reset-password");
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  return { loading, forgotPassword };
};

export default useForgetPassword;
