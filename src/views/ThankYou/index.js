import Link from "next/link";
import paths from "core/paths";

import styles from "./ThankYouPage.module.scss";

const ThankYouPage = ({ order, token }) => {
  console.log(order);

  return (
    <section className={styles.wrap}>
      <div className="container">
        <h1 className={styles.title}>Thank you for your order</h1>

        <p>
          Your order number is <strong>{order.number}</strong>.
        </p>

        {order.paymentStatus === "NOT_CHARGED" ? (
          <p>
            We will be in touch to go over finance options and complete your
            order with you.
          </p>
        ) : (
          <p>
            We've emailed you an order confirmation, and we'll notify you when
            the order has been shipped.
          </p>
        )}

        <div className={styles.buttons}>
          <Link href={{ pathname: paths.account.order, query: { token } }}>
            <a className="btn btn-circle">Order Details</a>
          </Link>

          <Link href={paths.shop}>
            <a className="btn btn-circle">Continue Shopping</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThankYouPage;
