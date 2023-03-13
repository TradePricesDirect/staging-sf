import { formatMoney } from "utils/money";
import { FC } from "react";

import styles from "./Money.module.scss";

export type Money = {
  money: any;
  suffix?: any;
  prefix?: any;
};

const Money: FC<Money> = ({ money, suffix, prefix, ...options }) => {
  let value = formatMoney(money, options);

  if (suffix) value = `${value} ${suffix}`;
  if (prefix) value = `${prefix} ${value}`;

  return <bdi className={styles.value}>{value}</bdi>;
};

export default Money;
