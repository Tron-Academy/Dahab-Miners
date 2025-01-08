import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="bg-primary w-screen h-screen flex flex-col gap-5 justify-center items-center text-white">
      <div className="text-5xl font-bold">404!</div>
      <p className="text-lg">The page you are looking is not found.</p>
      <Link to={"/"} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
        Back Home
      </Link>
    </div>
  );
}
