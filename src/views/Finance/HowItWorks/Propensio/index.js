import Image from "next/image";

import styles from "../Step.module.scss";

const Propensio = () => {
  return (
    <ul className={styles.steps}>
      <li>
        <Image
          src="/icons/finance/propensio-laptop.svg"
          alt="Select Propensio Finance at Checkout"
          width={140}
          height={160}
        />
        <h4>
          Select Propensio <br />
          Finance at Checkout
        </h4>
      </li>
      <li>
        <Image
          src="/icons/finance/online-form.svg"
          alt="Fill Out Quick Online Form"
          width={140}
          height={160}
        />
        <h4>
          Fill Out Quick <br />
          Online Form
        </h4>
      </li>
      <li>
        <Image
          src="/icons/finance/monthly-payments.svg"
          alt="Make Affordable Monthly Payments"
          width={140}
          height={160}
        />
        <h4>
          Make Affordable <br />
          Monthly Payments
        </h4>
      </li>
      <li>
        <Image
          src="/icons/finance/enjoy-purchase.svg"
          alt="Enjoy Your Purchase"
          width={140}
          height={160}
        />
        <h4>
          Enjoy Your <br />
          Purchase
        </h4>
      </li>
    </ul>
  );
};

export default Propensio;
