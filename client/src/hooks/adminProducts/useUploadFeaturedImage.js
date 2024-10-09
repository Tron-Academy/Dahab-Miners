import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constants";

const useUploadFeaturedImage = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const uploadFeaturedImage = async (e) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("featuredImage", e.target.files[0]);
    const file = formdata.get("featuredImage");
    if (file.size > 500000) {
      toast.error("Image is too large. should be below 500kb");
      return null;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/product/featured-image`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      const data = res.data;
      if (data.msg === "success") {
        toast.success("image uploaded");
        setDetails({
          featuredImage: data.url,
          featuredImagePublicId: data.publicId,
        });
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
  return { loading, uploadFeaturedImage, details };
};

export default useUploadFeaturedImage;
