import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import { setUser } from "../../slices/userSlice";

const useLogoutUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/auth/logout`,
        {},
        { withCredentials: true }
      );
      const data = res.data;
      if (data.msg === "successfully logged out") {
        toast.success("successfully logged out");
        navigate("/auth/login");
        dispatch(setUser(null));
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
  return { loading, logout };
};

export default useLogoutUser;
