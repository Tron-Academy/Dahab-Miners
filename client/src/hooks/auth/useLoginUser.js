import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.msg === "successfully logged in") {
        toast.success("login success");
        navigate("/admin/dashboard");
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
  return { loading, login };
};

export default useLoginUser;
