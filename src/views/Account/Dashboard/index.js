import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import {
  faAddressBook,
  faBoxOpen,
  faUser,
} from "@fortawesome/pro-regular-svg-icons";
import paths from "core/paths";
import useGreeting from "hooks/useGreeting";
import withAuth from "../withAuth";
import Account from "components/templates/Account";
import AccountWidget from "components/organisms/AccountWidget";
import AccountWidgetOrders from "components/molecules/AccountWidgetOrders";
import AccountWidgetDetails from "components/molecules/AccountWidgetDetails";
import AccountWidgetAddresses from "components/molecules/AccountWidgetAddresses";

import styles from "./Dashboard.module.scss";

const AccountDashboard = () => {
  const { user, signOut } = useAuth();
  const greeting = useGreeting(user.firstName);

  return (
    <Account>
      <h1 className={styles.title}>{greeting}</h1>

      <div className={styles.grid}>
        <AccountWidget
          icon={faBoxOpen}
          title="Recent Orders"
          body={<AccountWidgetOrders />}
          footer={
            <Link href={paths.account.orders}>
              <a className="btn btn-primary mt-auto">View All</a>
            </Link>
          }
        />

        <AccountWidget
          icon={faUser}
          title="Account Details"
          body={<AccountWidgetDetails />}
          footer={
            <Link href={paths.account.details}>
              <a className="btn btn-primary">Edit Details</a>
            </Link>
          }
        />

        <AccountWidget
          icon={faAddressBook}
          title="Addresses"
          body={<AccountWidgetAddresses />}
          footer={
            <Link href={paths.account.addresses}>
              <a className="btn btn-primary">Manage</a>
            </Link>
          }
        />
      </div>

      <button onClick={() => signOut()} className="btn btn-outline-primary">
        Sign out
      </button>
    </Account>
  );
};

export default withAuth(AccountDashboard);
