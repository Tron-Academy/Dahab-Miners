import React from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

export default function CoinTypes({ list }) {
  return (
    <div className="bg-white rounded-lg p-5 mb-5">
      <h4 className="text-xl pb-3">Minable Coins</h4>
      {list?.length > 0 &&
        list.map((x, index) => (
          <div key={index} className="flex gap-3 items-center">
            <div>
              <HiOutlineCurrencyDollar />
            </div>
            <p>{x}</p>
          </div>
        ))}
    </div>
  );
}
