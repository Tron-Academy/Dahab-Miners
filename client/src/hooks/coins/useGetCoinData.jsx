import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetCoinData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState([]);

  const getCoinData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,tether,solana,binancecoin,dogecoin"
      );
      const data = res.data;
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ws = new WebSocket(
      "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,ripple,tether,solana,binancecoin,dogecoin"
    );
    ws.onmessage = (message) => {
      const PriceData = JSON.parse(message.data);

      setPrices((prevPrices) => ({ ...prevPrices, ...PriceData }));
    };
    getCoinData();
    return () => ws.close();
  }, []);

  return { loading, data, prices };
};

export default useGetCoinData;
