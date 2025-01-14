import React from "react";
import WhyChooseCard from "./WhyChooseCard";

export default function WhyChooseUs() {
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-20 flex md:flex-row flex-col-reverse md:justify-around gap-5 items-center relative">
      <div className="grid grid-cols-2 grid-rows-5 gap-5 w-[420px] h-[580px] z-10 place-items-center">
        <WhyChooseCard
          icon={"/home/c-1.png"}
          content={"User-Friendly Interface"}
          position={"col-start-1 col-end-2 row-start-1 row-end-3"}
        />
        <WhyChooseCard
          icon={"/home/c-2.png"}
          content={"Free Transactions"}
          position={"col-start-2 col-end-3 row-start-2 row-end-4"}
        />
        <WhyChooseCard
          icon={"/home/c-3.png"}
          content={"24/7 Customer Support"}
          position={"col-start-1 col-end-2 row-start-3 row-end-5"}
        />
        <WhyChooseCard
          icon={"/home/c-4.png"}
          content={"Fast Transaction Processing"}
          position={"col-start-2 col-end-3 row-start-4 row-end-6"}
        />
      </div>
      <div className="bg-[#001030] w-[650px] h-[650px] absolute xl:left-0 lg:-left-[10%] -left-[30%] rounded-e-full md:block hidden"></div>
      <img
        src="/home/arrow-1.png"
        className="absolute bottom-[10%] left-[20%] md:block hidden"
      />
      <img
        src="/home/arrow-2.png"
        className="absolute top-[10%] right-[50%] md:block hidden"
      />
      <div className="flex flex-col md:items-start items-center gap-5">
        <h4 className="text-[40px] font-semibold gradient-heading md:text-left text-center">
          Why Choose Us?
        </h4>
        <p className="text-sm text-white w-[250px] md:text-left text-center">
          Diverse ecosystem. Long experience in the Cryptocurrency Industry.
        </p>
        <button className="btn-bg px-5 py-2 rounded-lg text-white w-fit">
          Contact Us
        </button>
      </div>
    </section>
  );
}
