import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/pro-regular-svg-icons";
import paths from "core/paths";
import withAuth from "../withAuth";
import Account from "components/templates/Account";
import Box from "components/organisms/Box";

import styles from "./OrderHistory.module.scss";

const AccountOrdersHistory = () => {
  return (
    <Account>
      <h1 className={styles.title}>Order History</h1>

      <Box className="mb-4">
        <table className="table table-borderless table-striped align-middle">
          <thead>
            <tr>
              <th scope="col">Order No.</th>
              <th scope="col">Order Placed</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col" className={styles.actionColumn}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>21/10/2022</td>
              <td>£199.99</td>
              <td>Confirmed</td>
              <td className={styles.actionColumn}>
                <Link
                  href={{
                    pathname: paths.account.order,
                    query: { token: "123" },
                  }}
                >
                  <a className="btn btn-sm btn-outline-primary">
                    <FontAwesomeIcon icon={faEye} />
                  </a>
                </Link>
              </td>
            </tr>

            <tr>
              <th scope="row">1</th>
              <td>21/10/2022</td>
              <td>£199.99</td>
              <td>Confirmed</td>
              <td className={styles.actionColumn}>
                <Link
                  href={{
                    pathname: paths.account.order,
                    query: { token: "123" },
                  }}
                >
                  <a className="btn btn-sm btn-outline-primary">
                    <FontAwesomeIcon icon={faEye} />
                  </a>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Account>
  );
};

export default withAuth(AccountOrdersHistory);
