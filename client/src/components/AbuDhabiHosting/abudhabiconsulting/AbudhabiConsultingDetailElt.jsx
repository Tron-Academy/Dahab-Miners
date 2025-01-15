import React from "react";

export default function AbudhabiConsultingDetailElt({ image, content }) {
  return (
    <div className="flex gap-3 items-center">
      <img src={image} />
      <p>{content}</p>
    </div>
  );
}
