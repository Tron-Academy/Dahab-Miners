import React, { useState } from "react";
import { faq } from "../../utils/faq";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoRemoveCircleOutline } from "react-icons/io5";

export default function FAQ() {
  const [selectedId, setSelectedId] = useState("");
  return (
    <div className="px-5 md:px-10 xl:px-[120px] py-10">
      <h1 className="text-4xl font-semibold text-center my-10">
        Frequently asked Questions
      </h1>
      <div className="flex flex-col justify-center items-center mx-auto w-full">
        {faq.map((x) => (
          <div
            key={x.id}
            onClick={() => {
              setSelectedId(x.id);
            }}
            className="border-b flex-grow w-[300px] md:w-[400px] lg:w-[768px] p-4 border-[#E4E7EC]"
          >
            <div className="flex justify-between w-full">
              <h1 className="text-base font-medium text-[#101828]">{x.q}</h1>
              <p className="text-xl text-[#1ECBAF]">
                {selectedId === x.id ? (
                  <IoRemoveCircleOutline />
                ) : (
                  <IoAddCircleOutline />
                )}
              </p>
            </div>
            {selectedId === x.id && (
              <div className="w-full text-base font-medium text-[#475467] animate-slideInTop">
                {x.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
