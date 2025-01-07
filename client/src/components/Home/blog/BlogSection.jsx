import React from "react";
import BlogCard from "./BlogCard";
import useGetUserBlogs from "../../../hooks/userBlogs/useGetUserBlogs";
import Loading from "../../Loading";
import { motion } from "framer-motion";

export default function BlogSection() {
  const { loading, blogs } = useGetUserBlogs();
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
      variants={sectionVariants}
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10"
    >
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
    </motion.section>
  );
}
