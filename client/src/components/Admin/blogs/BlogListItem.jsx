import React from "react";
import { Link } from "react-router-dom";

export default function BlogListItem({ name, created, id }) {
  return (
    <div className=" flex md:flex-row flex-col justify-between gap-10 px-10 items-center bg-homeBgGradient rounded-lg my-2 p-3 text-white">
      <div className="flex md:flex-row flex-col items-center gap-2 justify-between grow">
        <h3 className="text-center">{name}</h3>
        <p>{created}</p>
      </div>
      <Link
        to={`/admin/blogs/${id}`}
        className="flex p-2 bg-homeBg rounded-lg hover:bg-blue-500 nav-link"
      >
        Details
      </Link>
    </div>
  );
}
