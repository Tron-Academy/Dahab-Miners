import React, { useState } from "react";
import { faq } from "../../../utils/faq";
import FAQCard from "./FAQCard";

export default function FAQSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10">
      <h4 className="text-[40px] font-semibold gradient-heading text-center">
        Frequently Asked Questions
      </h4>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 my-10">
        {faq.map((x) => (
          <FAQCard
            key={x.id}
            count={x.id}
            question={x.q}
            answer={x.a}
            active={active}
            setActive={setActive}
          />
        ))}
      </div>
    </section>
  );
}
