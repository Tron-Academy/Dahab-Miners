import React from "react";
import SecondSectionHeaderElement from "./SecondSectionHeaderElement";

export default function SecondSectionHeader() {
  return (
    <div className="flex justify-between items-center">
      <SecondSectionHeaderElement
        icon={"/home/icon-3.png"}
        text={"1 year warranty on quality-tested mining hardware"}
      />
      <SecondSectionHeaderElement
        icon={"/home/icon-2.png"}
        text={"Individual strategy tailored to your company"}
      />
      <SecondSectionHeaderElement
        icon={"/home/icon-1.png"}
        text={"German quality & reliability in procurement"}
      />
    </div>
  );
}
