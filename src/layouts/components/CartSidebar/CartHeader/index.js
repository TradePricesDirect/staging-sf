import Link from "next/link";
import { useCart } from "@saleor/sdk";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockAlt, faTimes, faTruck } from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import { useOverlay } from "contexts/OverlayContext";
import { useShop } from "contexts/ShopContext";
import Money from "components/atoms/Money";

import styles from "./CartHeader.module.scss";

const CartHeader = () => {
  const overlay = useOverlay();
  const { items, subtotalPrice } = useCart();
  const { displayGrossPrices } = useShop();

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
            <div className={styles.subtotal}>
              {subtotalPrice && (
                <Money
                  money={
                    displayGrossPrices ? subtotalPrice.net : subtotalPrice.gross
                  }
                />
              )}
            </div>
          </div>
        </div>

        <p className={styles.lead}>
          <FontAwesomeIcon icon={faTruck} /> Free UK Delivery & Returns
        </p>

        <p className={styles.lead}>
          <FontAwesomeIcon icon={faLockAlt} /> Secure payment with SSL data
          encryption
        </p>

        {items?.length > 0 && (
          <div className={styles.buttons}>
            <Link href={paths.checkout}>
              <a className={clsx("btn btn-primary", styles.checkoutButton)}>
                Proceed To Checkout
              </a>
            </Link>

            <Link href={paths.basket}>
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
