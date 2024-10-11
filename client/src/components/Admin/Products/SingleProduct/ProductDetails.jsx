import React from "react";
import DetailElt from "./DetailElt";

export default function ProductDetails({ hash, power, algorithm }) {
  return (
    <div className="bg-white rounded-lg p-5 my-10">
      <div className="flex flex-col gap-10">
        <DetailElt title={"HashRate"} value={`${hash}`} />
        <DetailElt title={"Power"} value={`${power} Watts`} />
        <DetailElt title={"Algorithm"} value={algorithm} />
      </div>
    </div>
  );
}
