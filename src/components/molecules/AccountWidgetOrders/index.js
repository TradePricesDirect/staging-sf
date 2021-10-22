import Link from "next/link";
import { useOrdersByUser } from "@saleor/sdk";
import clsx from "clsx";
import { formatDate } from "utils/date";
import paths from "core/paths";
import Money from "components/atoms/Money";
import Loader from "components/atoms/Loader";

import styles from "./AccountWidgetOrders.module.scss";

const AccountWidgetOrders = () => {
  const { data, loading } = useOrdersByUser({ perPage: 3 });

  const orders = data?.edges.map((e) => e.node) || [];

  if (loading) return <Loader />;

  if (!orders.length)
    return (
      <p className={styles.text}>
        <em>No orders have been placed with this account.</em>
      </p>
    );

  return (
    <div className="table-responsive-sm">
      <table className={clsx("table table-borderless", styles.table)}>
        <thead>
          <tr>
            <th>Order No.</th>
            <th>Order Date</th>
            <th>Order Total</th>
            <th className={styles.actionColumn}></th>
          </tr>
        </thead>

        <tbody>
          {orders.map(({ id, number, created, total, token }) => (
            <tr key={id}>
              <td>{number}</td>
              <td>{formatDate(created)}</td>
              <td>
                <Money money={total.gross} />
              </td>
              <td>
                <Link
                  href={{ pathname: paths.account.order, query: { token } }}
                >
                  <a>View</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountWidgetOrders;
