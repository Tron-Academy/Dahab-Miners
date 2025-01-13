import React from "react";

export default function AbudhabiLanding() {
  return (
    <div className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 landingHeight flex justify-between items-center">
      <div className="flex flex-col gap-5 max-w-[620px]">
        <h4 className="text-[40px] gradient-heading font-semibold">
          Bitcoin mining in AbuDhabi
        </h4>
        <p>
          Buy a crypto mining machine today and step into the future of crypto
          mining. With expert support, your success is just a step away. Shop
          now
        </p>
        <button className="px-4 py-2 rounded-full btn-bg w-fit">
          Know More
        </button>
      </div>
      <div>
        <img src="/host/map.png" />
      </div>
    </div>
  );
}
