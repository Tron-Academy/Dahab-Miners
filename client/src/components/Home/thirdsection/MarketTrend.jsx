import React from "react";
import TrendCard from "./TrendCard";

export default function MarketTrend() {
  return (
    <div>
      <h4 className="gradient-heading text-[40px] font-semibold">
        Market Trend
      </h4>
      <div className="flex justify-between my-5">
        <TrendCard
          short={"BTC"}
          icon={"/home/coin-1.png"}
          name={"BITCOIN"}
          value={56623.64}
          percent={1.14}
          data={[3, 3.5, 2, 4, 5, 10]}
        />
        <TrendCard
          short={"ETH"}
          icon={"/home/coin-2.png"}
          name={"ETHEREUM"}
          value={4267.9}
          percent={2.22}
          data={[3, 3.5, 2, 4, 5, 10]}
        />
        <TrendCard
          short={"BNB"}
          icon={"/home/coin-3.png"}
          name={"BINANCE"}
          value={587.74}
          percent={0.82}
          data={[3, 3.5, 2, 4, 5, 10]}
        />
        <TrendCard
          short={"USDT"}
          icon={"/home/coin-4.png"}
          name={"TETHER"}
          value={0.9998}
          percent={0.03}
          data={[3, 3.5, 2, 4, 5, 10]}
        />
      </div>
    </div>
  );
}
