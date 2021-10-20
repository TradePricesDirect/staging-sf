import Account from "components/templates/Account";
import withAuth from "./withAuth";

const AccountOrdersHistory = () => {
  return (
    <Account>
      <h1>Account Orders History</h1>
    </Account>
  );
};

export default withAuth(AccountOrdersHistory);
