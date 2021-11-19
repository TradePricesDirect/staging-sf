import Image from "next/image";
import { useCart } from "@saleor/sdk";
import clsx from "clsx";

import styles from "./CartFinanceBanner.module.scss";

const CartFinanceBanner = () => {
  const { totalPrice } = useCart();

  const amount = totalPrice?.gross.amount;

  if (amount < 1000) {
    return (
      <aside className={clsx(styles.banner, styles.klarna)}>
        <div className={styles.logo}>
          <Image
            src="/icons/klarna-logo.svg"
            alt="Propensio"
            width={624}
            height={140}
          />
        </div>
        <p>
          Shop Now, Pay Later, with Klarna <br />
          for purchases up to £1,000.
        </p>
      </aside>
    );
  }

  return (
    <aside className={clsx(styles.banner, styles.propensio)}>
      <div className={styles.logo}>
        <Image
          src="/icons/payment-propensio-landscape.svg"
          alt="Propensio"
          width={590}
          height={164}
        />
      </div>

      <p>
        Spread up to £25,000 over 10 years with <br />
        £0 Deposit and fund your dream renovation.
      </p>
    </aside>
  );
};

export default CartFinanceBanner;
