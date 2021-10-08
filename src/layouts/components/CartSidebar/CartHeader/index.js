import Link from "next/link";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockAlt, faTimes } from "@fortawesome/pro-light-svg-icons";
import { useOverlay } from "contexts/OverlayContext";

import styles from "./CartHeader.module.scss";

const CartHeader = () => {
  const overlay = useOverlay();

  const hasCheckoutLines = true;

  return (
    <>
      <div className={styles.close}>
        <button
          type="button"
          className="btn btn-sm"
          aria-label="Close"
          title="Close"
          onClick={overlay.hide}
        >
          <FontAwesomeIcon icon={faTimes} />
          <span className="visually-hidden">Close</span>
        </button>
      </div>

      <div className={styles.header}>
        <div className="row align-items-cen ter justify-content-between mb-4">
          <div className="col">
            <h3 className={styles.title}>Your Basket</h3>
          </div>

          <div className="col-auto">
            <div className={styles.subtotal}>SUBTOTAL PRICE</div>
          </div>
        </div>

        <p className={styles.lead}>
          <FontAwesomeIcon icon={faLockAlt} /> Secure payment with SSL data
          encryption
        </p>

        {hasCheckoutLines && (
          <div className={styles.buttons}>
            <Link href="/checkout">
              <a className={clsx("btn btn-primary", styles.checkoutButton)}>
                Proceed To Checkout
              </a>
            </Link>

            <Link href="/basket">
              <a
                className={clsx(
                  "btn btn-outline-secondary",
                  styles.basketButton
                )}
              >
                Review Basket
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartHeader;
