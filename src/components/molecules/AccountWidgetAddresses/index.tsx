import { useAuth } from "@saleor/sdk";
import { formatAddress } from "utils/address";

import styles from "./AccountWidgetAddresses.module.scss";

const AccountWidgetAddresses = () => {
  const { user } = useAuth();

  const shippingAddress = formatAddress(user?.defaultShippingAddress, ", ");
  const billingAddress = formatAddress(user?.defaultBillingAddress, ", ");

  return (
    <>
      <h6 className={styles.title}>Default Shipping</h6>
      {shippingAddress ? (
        <address className={styles.text}>{shippingAddress}</address>
      ) : (
        <p className={styles.text}>
          <em>No default shipping address has been set.</em>
        </p>
      )}

      <h6 className={styles.title}>Default Billing</h6>
      {billingAddress ? (
        <address className={styles.text}>{billingAddress}</address>
      ) : (
        <p className={styles.text}>
          <em>No default billing address has been set.</em>
        </p>
      )}
    </>
  );
};

export default AccountWidgetAddresses;
