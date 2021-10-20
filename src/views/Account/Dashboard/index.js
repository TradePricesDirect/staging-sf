import { useAuth } from "@saleor/sdk";
import Account from "components/templates/Account";
import useGreeting from "hooks/useGreeting";
import withAuth from "../withAuth";

const AccountDashboard = () => {
  const { user, signOut } = useAuth();
  const greeting = useGreeting(user.firstName);

  return (
    <Account>
      <h1>{greeting}</h1>

      <p>
        This is your account dashboard. You can explore and manage your account
        using the links on the left.
      </p>

      <button onClick={() => signOut()} className="btn btn-outline-primary">
        Sign out
      </button>
    </Account>
  );
};

export default withAuth(AccountDashboard);
