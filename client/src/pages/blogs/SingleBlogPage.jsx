import React, { useEffect } from "react";
import BlogHeader from "../../components/blogs/singleblog/BlogHeader";
import BlogContent from "../../components/blogs/singleblog/BlogContent";
import RelatedBlogs from "../../components/blogs/singleblog/RelatedBlogs";
import useGetSingleUserBlog from "../../hooks/userBlogs/useGetSingleUserBlog";
import Loading from "../../components/Loading";
import { Link, useParams } from "react-router-dom";
import useGetRelatedBlogs from "../../hooks/userBlogs/useGetRelatedBlogs";
import { Helmet } from "react-helmet";

export default function SingleBlogPage() {
  const { id } = useParams();
  const { loading, blog, refetch } = useGetSingleUserBlog({ id });
  const {
    loading: relatedLoading,
    blogs,
    refetch: relatedRefetch,
  } = useGetRelatedBlogs({ id });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    refetch();
    relatedRefetch();
  }, [id]);
  return loading ? (
    <Loading />
  ) : (
    <div>
      <Helmet>
        <title>Crypto Mining Insights and Tips | Dahab Miners Blog</title>
        <meta
          name="description"
          content="Stay updated with the latest news, tips, and insights on crypto mining at Dahab Miners' blog. Learn how to optimize your mining operations today"
        />
        <meta name="keywords" content="Buy Bitcoin Miners in Abu Dhabi" />
      </Helmet>
      <div className="my-5 flex justify-end">
        <Link
          className=" p-2 text-lg text-white px-4 mx-5 rounded-lg bg-btnGreen hover:bg-btnHover nav-link"
          to={"/blogs"}
        >
          Back
        </Link>
      </div>

      <BlogHeader data={blog && blog} />
      <BlogContent data={blog && blog} />
      <RelatedBlogs loading={relatedLoading} data={blogs} />
    </div>
  );
}
