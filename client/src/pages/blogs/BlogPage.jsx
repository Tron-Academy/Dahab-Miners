import React, { useEffect } from "react";
import BlogPageHeader from "../../components/blogs/BlogPageHeader";
import BlogList from "../../components/blogs/BlogList";

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <BlogPageHeader />
      <BlogList />
    </div>
  );
}
