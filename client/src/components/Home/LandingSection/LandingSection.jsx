import React, { useState } from "react";

import HostingCarousel from "./HostingCarousel";
import BuyingCarousel from "./BuyingCarousel";
import RepairCarousel from "./RepairCarousel";
import CarouselNavigation from "./CarouselNavigation";

export default function LandingSection() {
  const [item, setItem] = useState(1);

  return (
    <div
      className="landingHeight px-5 md:px-10 lg:px-[120px] pt-10 overflow-hidden bg-top bg-cover"
      style={{ backgroundImage: `url("/home/landingbg.jpg")` }}
    >
      {item === 1 && <BuyingCarousel setItem={setItem} item={item} />}
      {item === 2 && <HostingCarousel setItem={setItem} item={item} />}
      {item === 3 && <RepairCarousel setItem={setItem} item={item} />}
    </div>
  );
}
