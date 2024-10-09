import React from "react";
import metrics from "../../../assets/metrics.svg";
import MetricsCard from "./MetricsCard";

export default function PerformanceMetrics() {
  return (
    <div
      className="bg-homeBg px-5 md:px-10 lg:px-[120px] bg-blend-hard-light py-10 flex flex-col items-center gap-10 w-full"
      style={{ backgroundImage: `url(${metrics})`, backgroundSize: "cover" }}
    >
      <h4 className="text-center text-5xl mb-5 font-semibold gradient-heading">
        Dive into our performance Metrics
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-y-10 gap-3 justify-items-center w-full">
        <MetricsCard stat={"5+"} content={"Years of Experience"} />
        <MetricsCard stat={"97%"} content={"Approximate uptime"} />
        <MetricsCard stat={"2+"} content={"Total facilities"} />
        <MetricsCard stat={"24/7"} content={"Customer Support"} />
      </div>
    </div>
  );
}
