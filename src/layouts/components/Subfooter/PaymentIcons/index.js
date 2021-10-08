import Propensio from "./icons/payment-propensio.svg";
import Klarna from "./icons/payment-klarna.svg";
import Stripe from "./icons/payment-stripe.svg";
import Visa from "./icons/payment-visa.svg";
import Mastercard from "./icons/payment-mastercard.svg";
import Amex from "./icons/payment-amex.svg";

import styles from "./PaymentIcons.module.scss";

const PaymentIcons = () => {
  return (
    <ul className={styles.list}>
      <li>
        <Propensio className={styles.icon} />
      </li>
      <li>
        <Klarna className={styles.icon} />
      </li>
      <li>
        <Stripe className={styles.icon} />
      </li>
      <li>
        <Visa className={styles.icon} />
      </li>
      <li>
        <Mastercard className={styles.icon} />
      </li>
      <li>
        <Amex className={styles.icon} />
      </li>
    </ul>
  );
};

export default PaymentIcons;
