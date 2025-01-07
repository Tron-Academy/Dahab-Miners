import React from "react";

export default function DiscussSection() {
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 main-bg">
      <div className="flex justify-between items-center customborder p-10">
        <div className="w-[250px] flex flex-col gap-5">
          <p className="text-[#0194FE] text-3xl font-semibold">Let's Discuss</p>
          <p className="text-[#A1D3F8]">
            Thank you for getting in touch! Kindly. Fill the form, have a great
            day!
          </p>
        </div>
        <div className="max-w-[400px] flex flex-col gap-5">
          <p className="text-[#A1D3F8] text-sm">
            If you want to start working with us, leave your e-mail and we will
            contact you for a free consultation.
          </p>
          <div className="flex relative">
            <input
              type="email"
              placeholder="Enter your Email"
              className="px-5 py-2 rounded-full outline-none bg-transparent border border-[#0194FE]"
            />
            <button className="btn-bg px-10 py-2 rounded-full absolute right-[25%]">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}