
import { icons } from "core/constants";
import withAuth from "../withAuth";
import Account from "components/templates/Account";
import PersonalDetails from "./PersonalDetails";
import PasswordChange from "./PasswordChange";
import AccountWidget from "components/organisms/AccountWidget";

import styles from "./Details.module.scss";


const AccountDetails = () => {
  return (
    <Account>
      <h1 className={styles.title}>Account Details</h1>

      <div className={styles.grid}>

        <AccountWidget
          icon={icons.faUser}
          title="Personal Details"
          body={<PersonalDetails />}
        />

        <AccountWidget
          icon={icons.faLockAlt}
          title="Password Change"
          body={<PasswordChange />}
        />


      </div>
    </Account>
  );
};

export default withAuth(AccountDetails);
