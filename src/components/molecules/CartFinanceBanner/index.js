import { useCart } from "@saleor/sdk";
import clsx from "clsx";

import styles from "./CartFinanceBanner.module.scss";

const CartFinanceBanner = () => {
  const { totalPrice } = useCart();

  const amount = totalPrice?.gross.amount;

  if (amount < 1000) {
    return (
      <aside className={clsx(styles.banner, styles.klarna)}>
        <p>Klarna Finance Banner</p>
      </aside>
    );
  }

  return (
    <aside className={clsx(styles.banner, styles.propensio)}>
      <p>Propsensio Finance Banner</p>
    </aside>
  );
};

export default CartFinanceBanner;
