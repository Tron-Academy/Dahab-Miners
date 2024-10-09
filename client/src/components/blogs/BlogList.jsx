import React from "react";
import BlogCard from "../Home/blog/BlogCard";
import useGetUserBlogs from "../../hooks/userBlogs/useGetUserBlogs";
import Loading from "../Loading";

export default function BlogList() {
  const { loading, blogs } = useGetUserBlogs();
  return loading ? (
    <Loading />
  ) : (
    <div className="px-5 md:px-10 lg:px-[120px] py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 gap-y-10 w-full justify-items-center my-10">
        {blogs.length > 0 &&
          blogs.map((x) => (
            <BlogCard
              key={x._id}
              image={x.blogImage}
              date={x.createdAt.toString().slice(0, 10)}
              title={x.title}
              content={x.content}
              id={x._id}
            />
          ))}
      </div>
    </div>
  );
}
