import React, { useEffect } from "react";
import BuyMinersSection from "../../components/buyMiners/BuyMinersSection";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function BuyMinersPage() {
  const location = useLocation();
  const fullUrl = window.location.origin + location.pathname + location.search;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Buy Bitcoin Miners in UAE",
    "url": "https://dahabminers.com/buy-bitcoin-miners-uae",
    "description":
      "Explore and purchase top Bitcoin mining machines in the UAE, including models like Bitmain Antminer AL1 Pro, DragonBall Miner A11, IceRiver AL3, and DragonBall Miner A40. Benefit from expert consultation, genuine products, and tailored hosting services.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://dahabminers.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Buy Bitcoin Miners in UAE",
          "item": "https://dahabminers.com/buy-bitcoin-miners-uae"
        }
      ]
    },
    "mainEntity": {
      "@type": "Product",
      "name": "Bitcoin Mining Machines",
      "description": "High-performance Bitcoin mining hardware available in the UAE.",
      "brand": {
        "@type": "Brand",
        "name": "Dahab Miners"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://dahabminers.com/buy-bitcoin-miners-uae",
        "priceCurrency": "AED",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Dahab Miners",
          "url": "https://dahabminers.com/"
        }
      }
    },
    "provider": {
      "@type": "Organization",
      "name": "Dahab Miners",
      "url": "https://dahabminers.com/",
      "logo": "https://dahabminers.com/logo.png",
      "sameAs": [
        "https://www.facebook.com/dahabminers",
        "https://twitter.com/dahabminers",
        "https://www.linkedin.com/company/dahabminers"
      ]
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <link
          rel="canonical"
          href={fullUrl || "https://dahabminers.com/"}
        />
        <title>Buy Bitcoin Miners in UAE | Bitcoin mining equipment Abu Dhabi
        </title>
        <meta
          name="description"
          content="Find and purchase the top Bitcoin Mining Machines in Dubai, UAE, such as the Bitmain Antminer AL1 Pro, DragonBall Miner A11, and IceRiver AL3. 
"
        />
        <meta
          name="keywords"
          content="Buy Bitcoin Miners UAE, Crypto mining hardware Dubai, Bitcoin mining equipment Abu Dhabi, Purchase crypto miners UAE"
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <BuyMinersSection />
    </div>
  );
}
