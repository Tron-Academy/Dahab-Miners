import React from "react";
import bg from "../../assets/blogHeader.svg";

export default function BlogPageHeader() {
  return (
    <div
      className="min-h-[600px] bg-no-repeat bg-cover bg-center flex flex-col justify-start items-center py-10"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h2 className="text-[40px] text-btnGreen font-semibold">BLOGS</h2>
    </div>
  );
}
