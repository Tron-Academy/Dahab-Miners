import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useUpdateInventory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateItem = async ({
    id,
    name,
    category,
    quantity,
    threshold,
    location,
  }) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/inventory/${id}`,
        {
          itemName: name,
          category,
          location,
          quantity,
          threshold,
        },
        { withCredentials: true }
      );
      const data = response.data;
      if (data.msg === "success") {
        toast.success("updated successfully");
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
  return { loading, updateItem };
};

export default useUpdateInventory;
