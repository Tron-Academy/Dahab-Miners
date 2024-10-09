import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { handleProductEnquiry } from "../../utils/whatsapp";

export default function ProductCard({ bgwhite, img, name, price }) {
  return (
    <div
      className={`pt-2 border flex flex-col gap-5 items-center rounded-lg hover:shadow-xl nav-link ${
        bgwhite && "bg-white"
      }`}
    >
      <div>
        <img
          className="w-[200px] h-[200px] overflow-hidden"
          src={img}
          alt={name}
        ></img>
      </div>
      <h1 className="text-xl text-center font-medium">{name}</h1>
      <p className="text-xl font-semibold text-[#F79009]">{`AED ${price}`}</p>
      <div
        onClick={() => handleProductEnquiry({ name })}
        className="text-base w-full font-semibold flex gap-3 cursor-pointer justify-center py-3 border-t items-center hover:bg-[#1ECBAF] rounded-lg nav-link mb-0"
      >
        <button>Buy Now</button>
        <p>
          <IoMdAddCircleOutline />
        </p>
      </div>
    </div>
  );
}
