import Account from "components/templates/Account";
import withAuth from "./withAuth";

const AccountPaymentMethods = () => {
  return (
    <Account>
      <h1>Account Payment Methods</h1>
    </Account>
  );
};

export default withAuth(AccountPaymentMethods);
