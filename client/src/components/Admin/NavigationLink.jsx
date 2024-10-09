import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavigationLink({ icon, name, path, urlworld }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Link
      to={path}
      className={`flex gap-3 items-center  my-3 text-lg font-light px-2 py-2 border-b rounded-xl hover:ml-3 nav-link hover:shadow-white hover:shadow-md ${
        pathname.includes(urlworld)
          ? "text-neutral-400 ml-3 shadow-md shadow-white"
          : "text-white"
      }`}
    >
      <div>{icon}</div>
      <p>{name}</p>
    </Link>
  );
}
