import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function BestSellingProducts({ products }) {
  return (
    <div className="px-2 py-5 w-full z-[1]">
      <div className="flex justify-between items-center">
        <h1 className="text-base lg:text-2xl font-semibold text-[#1ECBAF]">
          Our Bestselling Products
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-10">
        {products?.length > 0 &&
          products.map((x) => (
            <ProductCard
              key={x._id}
              img={x.productImage}
              name={x.productName}
              price={x.price}
              
            />
          ))}
      </div>
    </div>
  );
}
