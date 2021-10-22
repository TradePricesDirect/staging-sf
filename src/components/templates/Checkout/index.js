import CheckoutCartSummary from "components/molecules/CheckoutCartSummary";

import styles from "./Checkout.module.scss";

const Checkout = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <div className="container py-8">
        <div className="row">
          <div className="col-12 col-lg-8">{children}</div>
          <div className="col-12 col-lg-4">
            <CheckoutCartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
