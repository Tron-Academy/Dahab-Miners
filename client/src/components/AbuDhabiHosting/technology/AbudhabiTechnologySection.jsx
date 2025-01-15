import React from "react";

export default function AbudhabiTechnologySection() {
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10">
      <div className="flex lg:flex-row flex-col-reverse justify-between gap-3 items-center p-10 customborder">
        <div className="max-w-[600px] flex flex-col lg:items-start items-center gap-5">
          <h4 className="gradient-heading lg:text-left text-center text-3xl font-semibold">
            The technology behind an efficient Bitcoin mining farm
          </h4>
          <p className="lg:text-left text-center">
            The safety of our facility and your investment is our top priority.
            MIM is equipped with a team of on-site staff and 24-hour camera
            surveillance to ensure safe operation around the clock.The Bitmain
            Repair Center and the MicroBT Repair Center (for Whatsminer) are
            currently opening new locations in Ethiopia, providing the important
            infrastructure for repairs and spare parts supply.
          </p>
        </div>
        <img
          src="/home/repair2.webp"
          className="max-w-[350px] object-cover rounded-md"
        />
      </div>
    </section>
  );
}
