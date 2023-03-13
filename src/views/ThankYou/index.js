import Link from "next/link";
import paths from "core/paths";

import styles from "./ThankYouPage.module.scss";
import Button from "components/atoms/Button";
import { icons } from "core/constants";

const ThankYouPage = ({ order, token }) => {
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
            {`We've emailed you an order confirmation, and we'll notify you when
            the order has been shipped.`}
          </p>
        )}

        <div className={styles.buttons}>
          {/* <Link href={{ pathname: paths.account.order, query: { token } }} className="btn btn-circle">
            Order Details
          </Link>

          <Link href={paths.home} className="btn btn-circle">
            Continue Shopping
          </Link> */}
          <Button path={`${paths.account.order}?token=${token}`} label={"Order Details"} icon={icons.faBoxOpen} />
          <Button path={paths.home} label={"Continue Shopping"} icon={icons.faArrowRight} />
        </div>
      </div>
    </section>
  );
};

export default ThankYouPage;
