import React from "react";

export default function BlogHeader({ data }) {
  return (
    <div className="bg-[#030D2AF0] px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex lg:flex-row flex-col gap-5 items-center">
      <img
        src={data && data.blogImage}
        className="lg:w-1/2 w-full rounded-lg overflow-hidden"
        alt={data && data.title}
      ></img>
      <div>
        <h2 className="text-2xl py-3 font-semibold gradient-heading">
          {data && data.title}
        </h2>
        <p className="text-white text-base">
          {data && data.createdAt.toString().slice(0, 10)}
        </p>
        <p className="text-gray-500 text-base">Admin</p>
      </div>
    </div>
  );
}
