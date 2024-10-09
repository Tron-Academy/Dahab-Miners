import React from "react";
import BlogCard from "./BlogCard";
import useGetUserBlogs from "../../../hooks/userBlogs/useGetUserBlogs";
import Loading from "../../Loading";

export default function BlogSection() {
  const { loading, blogs } = useGetUserBlogs();
  return (
    <div className="px-5 md:px-10 lg:px-[120px] py-10">
      <h4 className="text-base font-semibold text-btnGreen text-center">
        Blogs
      </h4>
      <h4 className="text-[40px] font-semibold gradient-heading text-center">
        Our Latest Insights
      </h4>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full justify-items-center my-10">
          {blogs.length > 0 &&
            blogs
              .slice(0, 3)
              .map((x) => (
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
      )}
    </div>
  );
}
