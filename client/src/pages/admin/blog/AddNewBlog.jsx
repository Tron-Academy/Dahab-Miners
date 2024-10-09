import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormInput from "../../../components/FormInput";
import ProductImageUpload from "../../../components/Admin/Products/ProductImageUpload";
import useUploadBlogImage from "../../../hooks/adminBlogs/useUploadBlogImage";
import Loading from "../../../components/Loading";
import useAddBlog from "../../../hooks/adminBlogs/useAddBlog";

export default function AddNewBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImageId, setBlogImageId] = useState("");

  const { loading, uploadBlogImage, details } = useUploadBlogImage();
  const { loading: blogLoading, addBlog } = useAddBlog();

  useEffect(() => {
    if (details) {
      setBlogImage(details.blogImage);
      setBlogImageId(details.blogImagePublicId);
    }
  }, [details, loading]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Add Blog</h1>
        <Link
          to={"/admin/blogs"}
          className="bg-homeBg p-2 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Go Back
        </Link>
      </div>
      <div className="my-10">
        <FormInput
          type={"text"}
          title={"Blog Title"}
          value={title}
          onchange={(e) => setTitle(e.target.value)}
          placeholder={"Enter Title"}
        />
        <div className="flex gap-2 items-end">
          <ProductImageUpload
            title={"Blog Image"}
            changeFunction={(e) => uploadBlogImage(e)}
          />
          {loading && <Loading />}
          {blogImage && (
            <div className="w-20 h-20 pb-5 rounded-lg overflow-hidden">
              <img src={blogImage} className="object-contain"></img>
            </div>
          )}
        </div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(value) => setContent(value)}
          className="bg-purple-50 rounded-lg"
        />
        <button
          onClick={() =>
            addBlog({
              title,
              blogImage,
              blogImagePublicId: blogImageId,
              content,
            })
          }
          className="bg-homeBg p-2 my-5 rounded-lg text-white hover:bg-blue-500 nav-link"
          disabled={blogLoading}
        >
          Save Blog
        </button>
        {blogLoading && <Loading />}
      </div>
    </div>
  );
}
