import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/pro-regular-svg-icons";
import paths from "core/paths";
import { formatDate } from "utils/date";
import Money from "components/atoms/Money";
import OrderStatus from "components/atoms/OrderStatus";

import styles from "./OrderTable.module.scss";

const OrderTable = ({ orders }) => {
  if (!orders.length) {
    return (
      <p>
        <em>No orders have been placed with this account.</em>
      </p>
    );
  }

  return (
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
        {orders.map(({ id, number, created, total, statusDisplay, token }) => (
          <tr key={id}>
            <td scope="row">{number}</td>
            <td>{formatDate(created)}</td>
            <td>
              <Money money={total.gross} />
            </td>
            <td>
              <OrderStatus status={statusDisplay} />
            </td>
            <td className={styles.actionColumn}>
              <Link href={{ pathname: paths.account.order, query: { token } }}>
                <a className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faEye} />
                </a>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
