import React from "react";

export default function HostMiningDescription() {
  return (
    <div className="px-5 md:px-10 lg:px-[120px] py-10 bg-homeBg">
      <div className="bg-white rounded-lg py-10 flex xl:flex-row flex-col gap-10 justify-around items-center px-5">
        <div className="flex flex-col lg:items-start items-center lg:text-left text-center gap-5 lg:max-w-[480px]">
          <p className="text-base font-semibold text-btnGreen">Host mining</p>
          <h1 className="text-3xl lg:text-[40px] font-semibold gradient-heading">
            How Much You Want to Earn Monthly
          </h1>
          <p className="text-lg font-medium leading-7">
            DAHAB has a network of trustworthy partners, offering access to
            facilities around the world. We collaborate exclusively with
            experienced data centers and professional hosting providers. These
            providers have years of expertise, delivering high reliability,
            competitive pricing, and superior services.
          </p>
          <p className="text-lg font-medium leading-7">
            For mid to large-scale customers, our technical staff will manage
            your miners and handle all direct relations with the crypto mining
            host on your behalf.
          </p>
        </div>
        <div className="w-[311px] h-[204px] md:w-[504px] md:h-[330px] rounded-lg overflow-hidden">
          <img src="/hostminingdesc.jpg" alt="Crypto mining hosting UAE"></img>
        </div>
      </div>
    </div>
  );
}
