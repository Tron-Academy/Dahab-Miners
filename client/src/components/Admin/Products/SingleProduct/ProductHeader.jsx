import React from "react";
import { Link } from "react-router-dom";

export default function ProductHeader({ img, name, price }) {
  return (
    <div className="bg-btnGreen flex md:flex-row flex-col justify-between items-center p-5 rounded-lg">
      <div className="flex md:flex-row flex-col gap-5 items-center">
        <img
          src={img}
          className="w-52 h-52 rounded-lg overflow-hidden"
          alt={name}
        />
        <div>
          <h1 className="text-2xl font-semibold my-2">{name}</h1>
          <p className="text-xl font-light">{`${price} AED`}</p>
        </div>
      </div>
      <Link
        to={"/admin/products"}
        className="flex p-2 bg-homeBg rounded-lg hover:bg-blue-500 text-white nav-link"
      >
        Go Back
      </Link>
    </div>
  );
}
