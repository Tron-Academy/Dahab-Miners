import React from "react";

export default function AbudhabiContactUs() {
  return (
    <div className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10">
      <div className="customborder p-10 flex md:flex-row flex-col gap-5 justify-between items-center">
        <div className="flex flex-col md:items-start items-center gap-3">
          <h5 className="text-[#0194FE] text-3xl md:text-left text-center font-semibold">
            Do you want to start mining?
          </h5>
          <p className="text-[#A1D3F8] md:text-left text-center">
            No matter what questions or concerns you have, we are happy to help.
          </p>
        </div>
        <button className="px-4 py-2 rounded-full btn-bg">Contact Us</button>
      </div>
    </div>
  );
}
