import Account from "components/templates/Account";
import withAuth from "../withAuth";

import styles from "./PaymentMethods.module.scss";

const AccountPaymentMethods = () => {
  return (
    <Account>
      <h1 className={styles.title}>Payment Methods</h1>

      <p>Looks like you haven‘t saved any payment options.</p>
    </Account>
  );
};

export default withAuth(AccountPaymentMethods);
