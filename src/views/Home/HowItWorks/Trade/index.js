import Image from "next/image";

import styles from "../Step.module.scss";

const Trade = () => {
  return (
    <ul className={styles.steps}>
      <li>
        <Image
          src="/images/process-customer-register.svg"
          alt="Register For Free"
          width={140}
          height={160}
        />
        <h4>Register For Free</h4>
      </li>
      <li>
        <Image
          src="/images/process-customer-shop.svg"
          alt="Shop Top Brands"
          width={140}
          height={160}
        />
        <h4>Shop Top Brands</h4>
      </li>
      <li>
        <Image
          src="/images/process-customer-pay.svg"
          alt="Pay Online or Finance"
          width={140}
          height={160}
        />
        <h4>Pay Online or Finance</h4>
      </li>
      <li>
        <Image
          src="/images/process-customer-delivery.svg"
          alt="Express Delivery"
          width={140}
          height={160}
        />
        <h4>Express Delivery</h4>
      </li>
    </ul>
  );
};

export default Trade;
