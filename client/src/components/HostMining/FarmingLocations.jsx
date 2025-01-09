import React from "react";
import FarmLocationCard from "./FarmLocationCard";

export default function FarmingLocations() {
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex flex-col items-center">
      <h4 className="gradient-heading text-[40px] text-center font-semibold">
        Bitcoin mining farm locations
      </h4>
      <p className="text-sm text-center text-white max-w-[450px]">
        A service that allows our customers to concentrate on the mining itself
        while outsourcing the operation of the infrastructure to us.
      </p>
      <div className="flex md:flex-row flex-col justify-center gap-10 my-10">
        <FarmLocationCard
          image={"/home/repair2.webp"}
          power={"4.0ct / kWh"}
          location={"Abu Dhabi"}
          hostingInfo={[
            "Hostingpreis: ab 4.0ct / kWh",
            "Minimum order quantity: 1 piece",
            "Setup Fee: ab $150",
          ]}
          generalInfo={[
            "Power source: Hydropower",
            "Capacity: 30 MW",
            "Accommodation: Warehouse/container",
            "Security: Employees on site",
            "Camera surveillance: 24 hours",
          ]}
        />
        <FarmLocationCard
          image={"/home/miningfacility.webp"}
          power={"4.0ct / kWh"}
          location={"Ethiopia"}
          hostingInfo={[
            "Hostingpreis: ab 4.0ct / kWh",
            "Minimum order quantity: 1 piece",
            "Setup Fee: ab $150",
          ]}
          generalInfo={[
            "Power source: Hydropower",
            "Capacity: 30 MW",
            "Accommodation: Warehouse/container",
            "Security: Employees on site",
            "Camera surveillance: 24 hours",
          ]}
        />
      </div>
    </section>
  );
}
