import React from "react";
import BlogCard from "../../Home/blog/BlogCard";
import Loading from "../../Loading";

export default function RelatedBlogs({ loading, data }) {
  return loading ? (
    <Loading />
  ) : (
    <div className="px-5 md:px-10 lg:px-[120px] py-10">
      <h3 className="text-xl font-semibold">Related Blogs</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 gap-y-10 w-full justify-items-center my-10">
        {data.length > 0 &&
          data
            .slice(0, 3)
            .map((x) => (
              <BlogCard
                key={x._id}
                image={x.blogImage}
                date={x.createdAt.toString().slice(0, 10)}
                title={x.title}
                content={x.content}
                id={x.slug}
              />
            ))}
      </div>
    </div>
  );
}
