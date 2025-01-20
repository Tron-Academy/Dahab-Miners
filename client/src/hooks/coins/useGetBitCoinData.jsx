import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetBitCoinData = () => {
  const [loading, setLoading] = useState(false);
  const [btcData, setBtcData] = useState([]);

  const getBTCData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://api.minerstat.com/v2/coins?list=BTC,"
      );
      const data = res.data;
      setBtcData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBTCData();
  }, []);

  return { loading, btcData };
};

export default useGetBitCoinData;
