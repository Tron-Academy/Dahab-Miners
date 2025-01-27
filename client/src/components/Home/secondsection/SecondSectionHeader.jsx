import React from "react";
import SecondSectionHeaderElement from "./SecondSectionHeaderElement";

export default function SecondSectionHeader() {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-4 gap-5 z-[1]">
      <SecondSectionHeaderElement
        icon={"/home/icon-3.png"}
        text={"6-12 months warranty for your miners"}
        style={
          "lg:col-span-1 col-span-2 lg:col-start-1 lg:col-end-2 col-start-2 col-end-4"
        }
      />
      <SecondSectionHeaderElement
        icon={"/home/icon-2.png"}
        text={"Mining strategies customized to your goals."}
        style={
          "lg:col-span-1 col-span-2 lg:col-start-2 lg:col-end-3 col-start-1 col-end-3 lg:row-start-1 row-start-2"
        }
      />
      <SecondSectionHeaderElement
        icon={"/home/icon-1.png"}
        text={"German quality & reliability in procurement"}
        style={
          "lg:col-span-1 col-span-2 lg:col-start-3 lg:col-end-4 col-start-3 col-end-5 lg:row-start-1 row-start-2"
        }
      />
    </div>
  );
}
