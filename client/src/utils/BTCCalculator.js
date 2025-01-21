export const coinsPerDay = (hashRate, difficulty, block_reward) => {
  const hashRateInSeconds = hashRate * 1000000000000;
  const btcPerDay =
    (hashRateInSeconds * 86400 * block_reward) / (difficulty * Math.pow(2, 32));
  return btcPerDay;
};

export const dailyEarnings = (btc, price) => {
  const earnings = btc * price;
  return earnings;
};

export const bitcoinBought = (investment, btcPrice) => {
  const bit = parseFloat(investment / btcPrice);
  return bit;
};
