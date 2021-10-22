import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockAlt, faUser } from "@fortawesome/pro-regular-svg-icons";
import withAuth from "../withAuth";
import Account from "components/templates/Account";
import PersonalDetails from "./PersonalDetails";
import PasswordChange from "./PasswordChange";

import styles from "./Details.module.scss";
import Box from "components/organisms/Box";

const AccountDetails = () => {
  return (
    <Account>
      <h1 className={styles.title}>Account Details</h1>

      <div className={styles.grid}>
        <Box>
          <h2 className={styles.subtitle}>
            <FontAwesomeIcon
              icon={faUser}
              fixedWidth
              size="sm"
              className="me-2"
            />
            Personal Details
          </h2>
          <PersonalDetails />
        </Box>

        <Box>
          <h2 className={styles.subtitle}>
            <FontAwesomeIcon
              icon={faLockAlt}
              fixedWidth
              size="sm"
              className="me-2"
            />
            Password Change
          </h2>
          <PasswordChange />
        </Box>
      </div>
    </Account>
  );
};

export default withAuth(AccountDetails);
