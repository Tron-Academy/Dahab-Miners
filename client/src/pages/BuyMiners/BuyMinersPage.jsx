import React, { useEffect } from "react";
import BuyMinersSection from "../../components/buyMiners/BuyMinersSection";
import { Helmet } from "react-helmet";

export default function BuyMinersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <title>Buy High-Performance Crypto Miners at Dahab Miners UAE</title>
        <meta
          name="description"
          content="Purchase powerful, reliable crypto miners at competitive prices from Dahab Miners. Get the best equipment for your mining operations in the UAE."
        />
        <meta name="keywords" content="Buy Bitcoin Miners in Abu Dhabi" />
      </Helmet>
      <BuyMinersSection />
    </div>
  );
}
