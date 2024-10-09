import React from "react";
import { Link } from "react-router-dom";

const truncateContent = (htmlContent, length) => {
  const plainText = htmlContent.replace(/<[^>]+>/g, ""); // Strip HTML tags
  return plainText.length > length
    ? plainText.substring(0, length) + "..."
    : plainText;
};

export default function BlogCard({
  image,
  date,
  title,
  content,
  alt,
  desc,
  id,
}) {
  return (
    <Link
      to={`/blogs/${id}`}
      className="max-w-96 p-2 rounded-lg shadow-sm border"
    >
      <div className="rounded-lg overflow-hidden mb-5">
        <img src={image} alt={alt} title={desc}></img>
      </div>
      <div className="flex flex-col gap-5 ">
        <p className="font-semibold text-base text-btnGreen">{date}</p>
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p
          className="text-lg font-normal text-gray-600"
          dangerouslySetInnerHTML={{ __html: truncateContent(content, 50) }}
        ></p>
        <Link
          to={`/blogs/${id}`}
          className="text-lg font-semibold text-btnGreen underline"
        >
          Read More
        </Link>
      </div>
    </Link>
  );
}
