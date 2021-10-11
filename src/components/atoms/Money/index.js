const Money = ({ money, suffix }) => {
  const value = formatMoney(money);

  return <bdi>{suffix ? `${value} ${suffix}` : value}</bdi>;
};

export default Money;

const formatMoney = ({ amount, currency }) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency,
  }).format(amount);
};
