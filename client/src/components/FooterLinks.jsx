import React from "react";

export default function FooterLinks({ icon, link }) {
  return (
    <a
      href={link}
      className="w-8 h-8 bg-[#051135] rounded-full flex justify-center items-center text-[#3DB2E8] hover:scale-110 hover:shadow-md hover:shadow-[#3DB2E8] duration-500 ease-in-out"
      target="_blank"
    >
      {icon}
    </a>
  );
}
