import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useGetAllBlogs from "../../../hooks/adminBlogs/useGetAllBlogs";
import Loading from "../../../components/Loading";
import BlogListItem from "../../../components/Admin/blogs/BlogListItem";

export default function AdminBlogPage() {
  const { loading, blogs } = useGetAllBlogs();
  return (
    <div>
      <div className="flex justify-end">
        <Link
          to={"/admin/blogs/new"}
          className="flex gap-3 items-center bg-homeBg p-2 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Add New Blog
          <span>
            <FaPlus />
          </span>
        </Link>
      </div>
      <h1 className="text-2xl my-2">All Blogs</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-10">
          {blogs.length > 0 &&
            blogs.map((x) => (
              <BlogListItem
                key={x._id}
                name={x.title}
                created={x.createdAt.toString().slice(0, 10)}
                id={x._id}
              />
            ))}
          {blogs.length === 0 && <p className="text-lg">No Blogs to show</p>}
        </div>
      )}
    </div>
  );
}
