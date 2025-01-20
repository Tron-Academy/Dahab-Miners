import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetSingleCoinGraphData = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState([]);

  const getGraphData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
      );
      const data = res.data;
      const array = data.prices.slice(0, 20).map((x) => x[1]);
      setGraphData(array);
      console.log(array);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGraphData();
  }, []);

  return { loading, graphData };
};

export default useGetSingleCoinGraphData;
