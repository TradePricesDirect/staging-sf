import { formatMoney } from "utils/money";
import { FC } from "react";

export type Money = {
  money: any;
  suffix?: any;
  prefix?: any;
};

const Money: FC<Money> = ({ money, suffix, prefix, ...options }) => {
  let value = formatMoney(money, options);

  if (suffix) value = `${value} ${suffix}`;
  if (prefix) value = `${prefix} ${value}`;

  return <bdi>{value}</bdi>;
};

export default Money;
