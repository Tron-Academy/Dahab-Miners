import React from "react";

export default function AbudhabiConsultingDetailElt({
  image,
  content,
  subContent,
}) {
  return (
    <div className="flex gap-3 items-center">
      <img src={image} alt="bitcoin-mining-hosting-abu-dhabi" />
      <p>
        {content}: <span className="font-light">{subContent}</span>
      </p>
    </div>
  );
}
