import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import { icons } from "core/constants";
import paths from "core/paths";
import useGreeting from "hooks/useGreeting";
import withAuth from "../withAuth";
import Account from "components/templates/Account";
import AccountWidget from "components/organisms/AccountWidget";
import AccountWidgetOrders from "components/molecules/AccountWidgetOrders";
import AccountWidgetDetails from "components/molecules/AccountWidgetDetails";
import AccountWidgetAddresses from "components/molecules/AccountWidgetAddresses";
import Button from "components/atoms/Button"

import styles from "./Dashboard.module.scss";

const AccountDashboard = () => {
  const { user, signOut } = useAuth();
  const greeting = useGreeting(user.firstName);

  return (
    <Account>
      <h1 className={styles.title}>{greeting}</h1>

      <div className={styles.grid}>
        <AccountWidget
          icon={icons.faBoxOpen}
          title="Recent Orders"
          body={<AccountWidgetOrders />}
          headerLink={
            <Link href={paths.account.orders} className="btn btn-link">
              View All
            </Link>
          }
        />

        <AccountWidget
          icon={icons.faUser}
          title="Account Details"
          body={<AccountWidgetDetails />}
          headerLink={
            <Link href={paths.account.details} className="btn btn-link">
              Edit
            </Link>
          }
        />

        <AccountWidget
          icon={icons.faAddressBook}
          title="Addresses"
          body={<AccountWidgetAddresses />}
          headerLink={
            <Link href={paths.account.addresses} className="btn btn-link">
              Manage
            </Link>
          }
        />
      </div>

      <Button
        onClick={() => signOut()}
        label={`Sign out`}
        icon={icons.faArrowRight}
      />
    </Account>
  );
};

export default withAuth(AccountDashboard);
