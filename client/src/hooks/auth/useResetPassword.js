import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constants";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const resetPassword = async ({
    email,
    verificationCode,
    password,
    confirmPassword,
  }) => {
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Passwords does not match");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/auth/reset-password`,
        { email, verificationCode, password },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.msg === "success") {
        toast.success("Password reset successfull");
        navigate("/auth/login");
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
  return { loading, resetPassword };
};

export default useResetPassword;
