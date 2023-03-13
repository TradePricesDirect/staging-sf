import { useAuth } from "@saleor/sdk";
import clsx from "clsx";

import styles from "./AccountWidgetDetails.module.scss";

const AccountWidgetDetails = () => {
  const { user } = useAuth();

  return (
    <table className={clsx("table table-borderless", styles.table)}>
      <h6>Registered Details</h6>
      <tbody>
        <tr>
          <th className={styles.th}>First Name</th>
          <td className={styles.td}>{user?.firstName}</td>
        </tr>
        <tr>
          <th className={styles.th}>Last Name</th>
          <td className={styles.td}>{user?.lastName}</td>
        </tr>
        <tr>
          <th className={styles.th}>Email Address</th>
          <td className={styles.td}>{user?.email}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AccountWidgetDetails;
