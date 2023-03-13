import Image from "next/image";
import { useCart } from "@saleor/sdk";
import { useShop } from "contexts/ShopContext";
import clsx from "clsx";
import Money from "components/atoms/Money";

import styles from "./CartFinanceBanner.module.scss";

const CartFinanceBanner = () => {
  const { totalPrice } = useCart();
  const { displayGrossPrices } = useShop();

  const payInThreeAmount = {
    net: totalPrice?.net.amount / 3,
    gross: totalPrice?.gross.amount / 3,
  };


  if (totalPrice?.gross.amount < 1000) {
    return (<>
      <hr />
      <p className={styles.small}>Finance options available</p>
      <aside className={styles.financeOption}>
        <div className={clsx(styles.logo, styles.klarna)}>
          <Image
            src="/icons/klarna-small.svg"
            alt="klarna"
            width={20}
            height={20}
          />
        </div>

        <p className={styles.monthlyPayments}> Pay with <strong>3 interest-free </strong>payments of <Money
          money={
            displayGrossPrices
              ? { ...totalPrice.gross, amount: payInThreeAmount.gross }
              : { ...totalPrice.net, amount: payInThreeAmount.net }
          }
        /> </p>
      </aside>
    </>
    );
  }

  return (
    <>
      <hr />
      <p className={styles.small}>Finance options available</p>
      <aside className={styles.financeOption}>
        <div className={clsx(styles.logo, styles.propensio)}>
          <Image
            src="/icons/payment-propensio-landscape.svg"
            alt="Propensio"
            width={20}
            height={20}
          />
        </div>

        <p><strong>Instant apply and decision</strong> with Propensio Finance</p>
      </aside>
    </>
  );
};

export default CartFinanceBanner;
