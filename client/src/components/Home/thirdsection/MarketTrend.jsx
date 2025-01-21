import React, { useEffect } from "react";
import TrendCard from "./TrendCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGetCoinData from "../../../hooks/coins/useGetCoinData";
import Loading from "../../Loading";
import { useDispatch } from "react-redux";
import { setBtcData2 } from "../../../slices/userSlice";

export default function MarketTrend() {
  const { loading, data, prices, btcData2 } = useGetCoinData();
  const dispatch = useDispatch();
  const settings = {
    dots: true,
    infinite: true,
    speed: 50,
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (btcData2) {
      dispatch(setBtcData2(btcData2));
    }
  }, [loading]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <h4 className="gradient-heading text-[40px] font-semibold">
        Market Trend
      </h4>
      <div className="">
        <Slider {...settings} className="my-10">
          {data.map((x) => (
            <TrendCard
              key={x.id}
              short={x.symbol.toUpperCase()}
              icon={x.image}
              name={x.name}
              value={
                prices.hasOwnProperty(x.id) ? prices[x.id] : x.current_price
              }
              percent={x.market_cap_change_percentage_24h}
              id={x.id}
            />
          ))}
          {/* <TrendCard
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
          /> */}
        </Slider>
      </div>
    </div>
  );
}
