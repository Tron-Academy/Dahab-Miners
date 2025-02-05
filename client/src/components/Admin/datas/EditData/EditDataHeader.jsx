import React from "react";
import { Link } from "react-router-dom";

export default function EditDataHeader() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Edit Data</h1>
        <Link
          to={"/admin/data"}
          className="bg-homeBg p-2 px-4 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
