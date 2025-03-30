import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constants";

const useUploadLogImage = () => {
  const [loading, setLoading] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);

  const uploadImage = async ({ e }) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("log", e.target.files[0]);
    const file = formdata.get("log");
    if (file.size > 500000) {
      toast.error("Image is too large. should be below 500kb");
      return null;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/repair/image-upload`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data.msg === "success") {
        toast.success("image uploaded");
        setImageDetails({
          url: data.url,
          publicId: data.publicId,
        });
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, uploadImage, imageDetails };
};

export default useUploadLogImage;
