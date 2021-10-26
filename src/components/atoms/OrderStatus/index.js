import clsx from "clsx";

import styles from "./OrderStatus.module.scss";

const OrderStatusEnum = {
  DRAFT: "Draft",
  UNCONFIRMED: "Unconfirmed",
  UNFULFILLED: "Unfulfilled",
  PARTIALLY_FULFILLED: "Partially fulfilled",
  PARTIALLY_RETURNED: "Partially returned",
  RETURNED: "Returned",
  FULFILLED: "Fulfilled",
  CANCELED: "Canceled",
};

const OrderStatus = ({ status }) => {
  switch (status) {
    case OrderStatusEnum.FULFILLED:
      return <div className={clsx(styles.badge, styles.green)}>Completed</div>;

    case OrderStatusEnum.UNFULFILLED:
      return <div className={clsx(styles.badge, styles.blue)}>Processing</div>;

    case OrderStatusEnum.PARTIALLY_FULFILLED:
      return <div className={clsx(styles.badge, styles.yellow)}>{status}</div>;

    case OrderStatusEnum.CANCELED:
    case OrderStatusEnum.RETURNED:
    case OrderStatusEnum.PARTIALLY_RETURNED:
      return <div className={clsx(styles.badge, styles.red)}>{status}</div>;

    default:
      return <div className={styles.badge}>{status}</div>;
  }
};

export default OrderStatus;
