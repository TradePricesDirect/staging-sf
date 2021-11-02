import { formatMoney } from "utils/money";

const Money = ({ money, suffix, prefix, ...options }) => {
  let value = formatMoney(money, options);

  if (suffix) value = `${value} ${suffix}`;
  if (prefix) value = `${prefix} ${value}`;

  return <bdi>{value}</bdi>;
};

export default Money;
