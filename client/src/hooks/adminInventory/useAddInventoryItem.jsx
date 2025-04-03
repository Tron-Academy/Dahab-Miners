import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useAddInventoryItem = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addItem = async ({ name, category, quantity, threshold, location }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/inventory`,
        {
          itemName: name,
          category,
          quantity,
          threshold,
          location,
        },
        { withCredentials: true }
      );
      const data = response.data;
      if (data.msg === "success") {
        toast.success("Item added successfully");
        navigate("/admin/inventory");
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

  return { loading, addItem };
};

export default useAddInventoryItem;
