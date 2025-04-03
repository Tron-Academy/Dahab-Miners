import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const useGenerateReport = () => {
  const [loading, setLoading] = useState(false);
  const downloadReport = async ({ id }) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/repair/generateReport/${id}`,
        {},
        { withCredentials: true, responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `repair-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, downloadReport };
};

export default useGenerateReport;
