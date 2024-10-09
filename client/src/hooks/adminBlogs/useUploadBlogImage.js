import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constants";

const useUploadBlogImage = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const uploadBlogImage = async (e) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("blogImage", e.target.files[0]);
    const file = formdata.get("blogImage");
    if (file.size > 500000) {
      toast.error("Image is too large. should be below 500kb");
      return null;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/blogs/blog-image`,
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
          blogImage: data.url,
          blogImagePublicId: data.publicId,
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
  return { loading, details, uploadBlogImage };
};

export default useUploadBlogImage;
