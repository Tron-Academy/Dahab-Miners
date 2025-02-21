import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGetSingleBlog from "../../../hooks/adminBlogs/useGetSingleBlog";
import Loading from "../../../components/Loading";
import DeletePrompt from "../../../components/Admin/Products/SingleProduct/DeletePrompt";
import useDeleteBlog from "../../../hooks/adminBlogs/useDeleteBlog";

export default function AdminSingleBlogPage() {
  const { id } = useParams();
  const { loading, blog } = useGetSingleBlog({ id });
  const [showDelete, setShowDelete] = useState(false);
  const { loading: deleteLoading, deleteBlog } = useDeleteBlog();

  const function1 = async () => {
    setShowDelete(false);
  };
  const function2 = async () => {
    deleteBlog({ id });
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      {showDelete && (
        <DeletePrompt function1={function1} function2={function2} />
      )}
      <div className="flex flex-col gap-7 items-center z-0">
        <h3 className="md:text-4xl font-semibold">{blog?.title}</h3>
        <img
          src={blog?.blogImage}
          className="max-w-[1024px] max-h-[400px] overflow-hidden"
        ></img>
        <p className="font-semibold">
          Created On: {blog?.createdAt.toString().slice(0, 10)}
        </p>
        <p
          className="text-gray-700 text-justify leading-9"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        ></p>
      </div>
      <div className=" flex gap-4 justify-end">
        <Link
          to={`/admin/blogs`}
          className="flex p-2 bg-homeBg rounded-lg hover:bg-blue-500 text-white nav-link"
        >
          Go Back
        </Link>
        <Link
          to={`/admin/blogs/${id}/edit`}
          className="p-2 px-5 bg-homeBg text-white rounded-lg hover:bg-blue-500 nav-link"
        >
          Edit
        </Link>
        <button
          className="p-2 px-5 bg-red-700 text-white rounded-lg hover:bg-red-500 nav-link"
          onClick={() => setShowDelete(true)}
        >
          Delete
          {deleteLoading && <Loading />}
        </button>
      </div>
    </>
  );
}
