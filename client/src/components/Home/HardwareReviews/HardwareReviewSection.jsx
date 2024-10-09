import React from "react";
import { FaStar } from "react-icons/fa";
import HardwareReviewCard from "./HardwareReviewCard";
import { CiHeart } from "react-icons/ci";
import { BsTruck } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import { CgDatabase } from "react-icons/cg";

export default function HardwareReviewSection() {
  return (
    <div className="bg-homeBg px-5 md:px-10 lg:px-[120px] py-10 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        <div className="text-white flex flex-col gap-5 lg:col-span-2">
          <h4 className="text-[40px] font-semibold gradient-heading max-w-[680px]">
            Why you should buy your mining hardware from DAHAB miners
          </h4>
          {/* <p className="text-5xl font-medium">4.9/5</p>
          <div className="flex gap-3 items-center">
            <div className="flex gap-1 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h3 className="text-lg font-medium">Based on 100+ reviews</h3>
          </div> */}
        </div>
        <HardwareReviewCard
          icon={<CiHeart />}
          content={
            "Our success depends on your satisfaction and profitability. We're committed to ensuring you thrive because your success is our success."
          }
        />
        <HardwareReviewCard
          icon={<BsTruck />}
          content={
            "We ensure fast processing and shipping times to meet your needs efficiently and reliably."
          }
        />
        <HardwareReviewCard
          icon={<FaRegComment />}
          content={
            "We offer professional and transparent consultation for your upcoming mining project, ensuring clarity and expert guidance throughout."
          }
        />
        <HardwareReviewCard
          icon={<CgDatabase />}
          content={
            "Complete end-to-end crypto mining solutions, covering procurement, hosting, repair, and after-sales support."
          }
        />
      </div>
    </div>
  );
}
