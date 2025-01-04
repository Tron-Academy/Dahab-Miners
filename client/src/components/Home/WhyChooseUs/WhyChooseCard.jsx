import React from "react";

function WhyChooseCard({ icon, content, position }) {
  return (
    <div
      className={`flex flex-col gap-5 justify-center items-center p-5 rounded-lg w-[200px] h-[200px] customborder ${position}`}
    >
      <img src={icon} className="w-[50px]" />
      <p className="text-white text-sm text-center">{content}</p>
    </div>
  );
}

export default WhyChooseCard;
