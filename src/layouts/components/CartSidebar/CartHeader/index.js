import Link from "next/link";
import { useCart } from "@saleor/sdk";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import paths from "core/paths";
import { useOverlay } from "contexts/OverlayContext";
import { useShop } from "contexts/ShopContext";
import Money from "components/atoms/Money";
import Button from "components/atoms/Button";

import styles from "./CartHeader.module.scss";

import Image from "next/image";

const CartHeader = () => {
  const overlay = useOverlay();
  const { items, subtotalPrice, totalPrice } = useCart();
  const { displayGrossPrices } = useShop();

  const totalItems = items ? items.reduce((partialSum, a) => partialSum + a.quantity, 0) : 0;

  const payInThreeAmount = {
    net: totalPrice?.net.amount / 3,
    gross: totalPrice?.gross.amount / 3,
  };



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
          <FontAwesomeIcon icon={icons.faTimes} />
          <span className="visually-hidden">Close</span>
        </button>
      </div>

      <div className={styles.header}>
        <div className="row align-items-cen ter justify-content-between mb-2">
          <div className="col">
            <h3 className={styles.title}>Your Basket</h3>
            {totalItems > 0 && (
              <p className={styles.small}>{totalItems} items</p>
            )}
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
            {totalItems > 0 && (<p className={styles.small}>Finance available</p>)}
          </div>
        </div>

        {totalItems > 0 && (
          <div className="row">
            <div className="col">
              {totalPrice?.gross.amount < 1000 && (
                <aside className={styles.financeOption}>
                  <div className={clsx(styles.logo, styles.klarna)}>
                    <Image
                      src="/icons/klarna-small.svg"
                      alt="klarna"
                      width={20}
                      height={20}
                    />
                  </div>

                  <p className={styles.monthlyPayments}> Pay with <strong>3 interest-free </strong>payments of <Money
                    money={
                      displayGrossPrices
                        ? { ...totalPrice.gross, amount: payInThreeAmount.gross }
                        : { ...totalPrice.net, amount: payInThreeAmount.net }
                    }
                  /> </p>
                </aside>
              )}
              <aside className={styles.financeOption}>
                <div className={clsx(styles.logo, styles.propensio)}>
                  <Image
                    src="/icons/payment-propensio-landscape.svg"
                    alt="Propensio"
                    width={20}
                    height={20}
                  />
                </div>

                <p>Instant apply and decision with Propensio Finance</p>
              </aside>
              <hr />
            </div>
          </div>
        )}

        {/* <p className={styles.lead}>
          <FontAwesomeIcon icon={faTruck} /> Free UK Delivery & Returns
        </p>

        <p className={styles.lead}>
          <FontAwesomeIcon icon={icons.faLockAlt} /> Secure payment with SSL data
          encryption
        </p> */}

        {items?.length > 0 && (
          <div className={styles.buttons}>
            <Button path={paths.checkout} label="Proceed to Checkout" color="secondary" icon={icons.faArrowRight} />

            <Link href={paths.basket} className={clsx(
              "btn btn-text",
              styles.basketButton
            )}>
              Review Basket
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartHeader;
