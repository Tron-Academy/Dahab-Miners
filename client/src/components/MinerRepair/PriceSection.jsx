import React, { forwardRef, useRef } from "react";
import PriceTable from "./PriceTable";

const PriceSection = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 w-full"
    >
      <div className="flex flex-col gap-10 justify-center items-center">
        <h1 className="text-3xl lg:text-[40px] pb-5 font-semibold gradient-heading max-w-[860px] text-center">
          Reliable ASIC Maintenance and Repair Services at Competitive Prices
        </h1>
        <p className="text-base font-medium leading-6 max-w-[960px] text-center">
          Maximize your mining efficiency with our trusted ASIC repair services.
          Our Full Unit Diagnostics service provides a thorough inspection and
          diagnosis of your entire ASIC miner, ensuring all
          performance-affecting issues are identified. Our skilled technicians
          meticulously assess every component to maintain peak operational
          standards.
        </p>
      </div>

      <PriceTable />
    </div>
  );
});

export default PriceSection;
