import React from "react";
import { Link } from "react-router-dom";

export default function ProductListItem({ img, name, id }) {
  return (
    <div className=" flex justify-between md:px-10 px-1 items-center bg-homeBgGradient rounded-lg my-2 p-3 text-white">
      <div className="flex gap-3 items-center">
        <img
          className="w-10 h-10 rounded-md hidden md:block overflow-hidden"
          src={img}
          alt={name}
        ></img>

        <h3>{name}</h3>
      </div>
      <Link
        to={`/admin/products/${id}`}
        className="flex p-2 bg-homeBg rounded-lg hover:bg-blue-500 nav-link"
      >
        Details
      </Link>
    </div>
  );
}
