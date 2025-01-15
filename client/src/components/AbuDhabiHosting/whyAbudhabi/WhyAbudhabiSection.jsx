import React from "react";
import WhyElt from "./WhyElt";

export default function WhyAbudhabiSection() {
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex flex-col gap-10">
      <h4 className="gradient-heading text-3xl font-semibold text-center">
        Why Choose AbuDhabi for Crypto Mining?
      </h4>
      <div className="p-10 customborder flex md:flex-row flex-col-reverse gap-10 items-center">
        <div className="flex flex-col gap-3">
          <WhyElt
            title={"Affordable Energy Costs"}
            content={
              "Our 30 MW plant is powered entirely by hydropower, Ethiopia's key to green energy. This enables us to offer our customers one of the most competitive hosting prices in the global Bitcoin mining market."
            }
          />
          <WhyElt
            title={"Renewable Energy Sources"}
            content={
              "Bei MIM profitieren unsere Kunden von einem äußerst wettbewerbsfähigen Hosting-Preis von nur 4,0 Cent pro kWh. Dieser Preis spiegelt unser Engagement wider, Bitcoin-Mining für eine breite Palette von Investoren zugänglich zu machen."
            }
          />
          <WhyElt
            title={"Strategic Location"}
            content={
              "With a capacity of 30 MW and the use of mining containers, we offer flexible and scalable solutions for your mining requirements. We accept orders for as little as one Asic miner with no setup fee. This makes us an attractive partner for your mining project of any size."
            }
          />
          <WhyElt
            title={"Developing Infrastructure"}
            content={
              "With a capacity of 30 MW and the use of mining containers, we offer flexible and scalable solutions for your mining requirements. We accept orders for as little as one Asic miner with no setup fee. This makes us an attractive partner for your mining project of any size."
            }
          />
        </div>
        <img src="/abudhabi/img-1.jpg" className="md:h-[500px] w-full" />
      </div>
    </section>
  );
}
