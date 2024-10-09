import React, { useEffect } from "react";
import BuyMinersSection from "../../components/buyMiners/BuyMinersSection";

export default function BuyMinersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <BuyMinersSection />
    </div>
  );
}
