import React, { useState } from "react";
import RequestHostingForm from "./RequestHostingForm";
import RequestHostingContactCard from "./RequestHostingContactCard";
import { IoLocationOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";

export default function RequestHostingSection() {
  return (
    <div className="px-5 md:px-10 xl:px-[120px] py-10 flex lg:flex-row flex-col gap-20 my-10">
      <RequestHostingForm />
      <div className="lg:w-1/2 w-full flex flex-col gap-10">
        <div className="w-full h-[400px] overflow-hidden rounded-lg object-cover">
          <img
            className=""
            alt="Crypto mining hosting UAE"
            src="/requesthosting.jpg"
          ></img>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <RequestHostingContactCard
            icon={<IoLocationOutline />}
            content={"Based in Abu Dhabi, UAE"}
          />
          <RequestHostingContactCard
            icon={<MdMailOutline />}
            content={"Rizwan@dahabminers.ae"}
          />
          <RequestHostingContactCard
            icon={<LuPhone />}
            content={"+971568145866"}
          />
        </div>
      </div>
    </div>
  );
}
