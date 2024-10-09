import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { setUser } from "../../slices/userSlice";

const useGetUser = () => {
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/admin/auth/user`, {
          withCredentials: true,
        });
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        if (data.msg === "success") {
          dispatch(setUser(data.userInfo));
        } else {
          console.log(data.msg);
          navigate("/auth/login");
        }
      } catch (err) {
        console.log(
          err?.response?.data?.msg || err?.error || "something went wrong"
        );
        navigate("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, []);
  return { loading, user };
};

export default useGetUser;
