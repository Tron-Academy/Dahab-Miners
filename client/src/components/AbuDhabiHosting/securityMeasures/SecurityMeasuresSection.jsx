import React from "react";

export default function SecurityMeasuresSection() {
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex flex-col gap-10">
      <h4 className="gradient-heading text-3xl font-semibold text-center">
        Security measures of the Bitcoin mining farms
      </h4>
      <div className="p-10 customborder flex flex-row-reverse gap-10">
        <div className="flex flex-col gap-5">
          <p>
            Security measures are an important aspect of operating the MIM
            Bitcoin Mining Farm in Paraguay. The facility contains a significant
            amount of hardware that needs to be protected. MIM has implemented
            several security measures to protect your hardware. Below are some
            of the most important aspects of the security concept:
          </p>
          <ul className="ml-5">
            <li>
              Surveillance cameras: The MIM Bitcoin Mining Farm in Paraguay is
              equipped with surveillance cameras that monitor the facility
              around the clock and can record suspicious activities. 
            </li>
            <li>
              Staff presence: MIM has staff present at the facility 24 hours a
              day, 365 days a year to monitor the farm and respond quickly in
              the event of a problem. These employees ensure that the facility
              is safe and secure.
            </li>
            <li>
              Insurance: The MIM Bitcoin Mining Farm in Paraguay has taken out
              insurance to protect its hardware. The insurance provides
              comprehensive protection against damage caused by natural
              disasters such as fire, tornadoes or flooding. The insurance
              enables MIM to minimise potential losses and ensure the continuity
              of operations.
            </li>
          </ul>
        </div>
        <img src="/abudhabi/img-2.jpg" />
      </div>
    </section>
  );
}
