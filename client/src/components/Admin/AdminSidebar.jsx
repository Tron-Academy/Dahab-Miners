import React from "react";
import { adminNavLinks } from "../../utils/adminNavlinks";
import NavigationLink from "./NavigationLink";

export default function AdminSidebar() {
  return (
    <div className="hidden xl:block w-64 bg-homeBg h-screen overflow-auto rounded-2xl p-2 sticky top-0 animate-slideInLeft">
      <div className="flex justify-center">
        <img className="w-32 h-32 " src="/adminlogo.png"></img>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        {adminNavLinks.map((x) => (
          <NavigationLink
            key={x.id}
            icon={x.icon}
            name={x.name}
            path={x.path}
            urlworld={x.urlword}
          />
        ))}
      </div>
    </div>
  );
}
