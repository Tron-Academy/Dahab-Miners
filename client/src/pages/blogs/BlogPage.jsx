import React, { useEffect } from "react";
import BlogPageHeader from "../../components/blogs/BlogPageHeader";
import BlogList from "../../components/blogs/BlogList";
import { Helmet } from "react-helmet";

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <title>Crypto Mining Insights and Tips | Dahab Miners Blog</title>
        <meta
          name="description"
          content="Stay updated with the latest news, tips, and insights on crypto mining at Dahab Miners' blog. Learn how to optimize your mining operations today"
        />
        <meta name="keywords" content="Buy Bitcoin Miners in Abu Dhabi" />
      </Helmet>
      <BlogPageHeader />
      <BlogList />
    </div>
  );
}
