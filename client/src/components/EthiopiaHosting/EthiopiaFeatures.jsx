import React from "react";
import AbuDhabiFeatureElement from "../AbuDhabiHosting/features/AbuDhabiFeatureElement";

export default function EthiopiaFeatures() {
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 lg:border-t lg:border-b border-[#BCFCF1CC]">
      <div className="grid lg:grid-cols-3 grid-cols-4 gap-5">
        <AbuDhabiFeatureElement
          icon={"/abudhabi/icon-1.png"}
          text={"Hosting Rates from 5.0¢/kWh"}
          style={
            "lg:col-span-1 col-span-2 lg:col-start-1 lg:col-end-2 col-start-2 col-end-4"
          }
        />
        <AbuDhabiFeatureElement
          icon={"/abudhabi/icon-2.png"}
          text={"100% hydropower"}
          style={
            "lg:col-span-1 col-span-2 lg:col-start-2 lg:col-end-3 col-start-1 col-end-3 lg:row-start-1 row-start-2"
          }
        />
        <AbuDhabiFeatureElement
          icon={"/abudhabi/icon-3.png"}
          text={"Up to 30 MW Capacity"}
          style={
            "lg:col-span-1 col-span-2 lg:col-start-3 lg:col-end-4 col-start-3 col-end-5 lg:row-start-1 row-start-2"
          }
        />
      </div>
    </section>
  );
}
