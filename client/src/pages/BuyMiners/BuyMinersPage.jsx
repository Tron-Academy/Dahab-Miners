import React, { useEffect } from "react";
import BuyMinersSection from "../../components/buyMiners/BuyMinersSection";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function BuyMinersPage() {
  const location = useLocation();
  const fullUrl = window.location.origin + location.pathname + location.search;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet>
        <link
          rel="canonical"
          href={fullUrl || "https://dahabminers.com/buy-bitcoin-miners-uae"}
        />
        <title>Buy High-Performance Crypto Miners at Dahab Miners UAE</title>
        <meta
          name="description"
          content="Purchase powerful, reliable crypto miners at competitive prices from Dahab Miners. Get the best equipment for your mining operations in the UAE."
        />
        <meta
          name="keywords"
          content="Buy Bitcoin Miners UAE, Crypto mining hardware Dubai, Bitcoin mining equipment Abu Dhabi, Purchase crypto miners UAE"
        />
      </Helmet>
      <BuyMinersSection />
    </div>
  );
}
