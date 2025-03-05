import React, { useEffect } from "react";
import BlogList from "../../components/blogs/BlogList";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function BlogPage() {
  const location = useLocation();
  const fullUrl = window.location.origin + location.pathname + location.search;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <link
          rel="canonical"
          href={fullUrl || "https://dahabminers.com/blogs"}
        />
        <title>Crypto Mining Insights and Tips | Dahab Miners Blog</title>
        <meta
          name="description"
          content="Stay updated with the latest news, tips, and insights on crypto mining at Dahab Miners' blog. Learn how to optimize your mining operations today"
        />
        <meta name="keywords" content="Buy Bitcoin Miners in Abu Dhabi" />
      </Helmet>

      <BlogList />
    </div>
  );
}
