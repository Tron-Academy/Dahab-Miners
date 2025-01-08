import React from "react";

function WhyChooseCard({ icon, content, position }) {
  return (
    <div
      className={`flex flex-col gap-5 justify-center items-center lg:p-5 p-2 rounded-lg lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] customborder ${position}`}
    >
      <img src={icon} className="lg:w-[50px] w-[40px]" />
      <p className="text-white lg:text-sm text-xs text-center">{content}</p>
    </div>
  );
}

export default WhyChooseCard;
