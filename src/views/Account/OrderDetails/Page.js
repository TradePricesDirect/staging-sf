import clsx from "clsx";

import { icons } from "core/constants";
import { FormattedAddress } from "utils/address";
import { formatDateTime } from "utils/date";
import Box from "components/organisms/Box";
import OrderLine from "components/organisms/OrderLine";
import TaxedMoney from "components/molecules/TaxedMoney";
import AccountWidget from "components/organisms/AccountWidget";
import styles from "./OrderDetails.module.scss";

const Page = ({ order }) => {
  return (
    <>
      <h1 className={styles.title}>Order Number: {order.number}</h1>

      <div className={styles.grid}>
        <AccountWidget
          icon={icons.faInfoSquare}
          title="Order Details"
          body={<>
            <table
              className={clsx("table table-borderless", styles.detailsTable)}
            >
              <tbody>
                <tr>
                  <th className={styles.th}>Order Placed</th>
                  <td className={styles.td}>{formatDateTime(order.created)}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Order Status</th>
                  <td className={styles.td}>{order.statusDisplay}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Payment Status</th>
                  <td className={styles.td}>{order.paymentStatusDisplay}</td>
                </tr>
              </tbody>
            </table></>}
        />

        <AccountWidget
          icon={icons.faAddressBook}
          title="Delivery Address"
          body={<FormattedAddress address={order.shippingAddress} />}
        />

        <AccountWidget
          icon={icons.faAddressBook}
          title="Delivery Address"
          body={<FormattedAddress address={order.billingAddress} />}
        />

      </div>

      <Box className="mb-4">
        <div className="table-responsive-md">
          <table className={clsx("table", styles.table)}>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.lines.map((line) => (
                <OrderLine key={line.id} {...line} />
              ))}
            </tbody>
            <tfoot className={styles.tableFoot}>
              <tr>
                <th colSpan="3">SUBTOTAL</th>
                <td>
                  <TaxedMoney taxedMoney={order.subtotal} gross />
                </td>
              </tr>
              <tr>
                <th colSpan="3">DELIVERY</th>
                <td>
                  <TaxedMoney taxedMoney={order.shippingPrice} gross />
                </td>
              </tr>
              <tr>
                <th colSpan="3">TOTAL</th>
                <td>
                  <TaxedMoney taxedMoney={order.total} gross />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Box>
    </>
  );
};

export default Page;
