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
          Expert ASIC Miner Repairs at Competitive Prices
        </h1>
        <p className="text-base font-medium leading-6 max-w-[960px] text-center">
          Keep your mining operations running smoothly with our trusted ASIC
          repair services. Our full diagnostics identify performance issues,
          while our skilled technicians ensure optimal efficiency and peak
          performance.
        </p>
      </div>

      <PriceTable />
    </div>
  );
});

export default PriceSection;
