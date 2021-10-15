import Link from "next/link";
import { useCart, useCheckout } from "@saleor/sdk";
import clsx from "clsx";
import paths from "core/paths";
import TaxedMoney from "components/molecules/TaxedMoney";

import styles from "./CartSummary.module.scss";

const CartSummary = () => {
  const { checkout } = useCheckout();
  const { subtotalPrice, shippingPrice, discount, totalPrice } = useCart();

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? { gross: shippingPrice, net: shippingPrice }
      : null;

  const discountTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  const isShipping =
    !!shippingTaxedPrice?.gross && shippingTaxedPrice.gross.amount !== 0;

  const isDiscount =
    !!discountTaxedPrice?.gross && discountTaxedPrice.gross.amount !== 0;

  return (
    <div className={styles.wrap}>
      <table className={clsx("table table-sm table-borderless", styles.table)}>
        <tbody>
          <tr>
            <th>Subtotal</th>
            <td>
              <TaxedMoney taxedMoney={subtotalPrice} gross />
            </td>
          </tr>

          {isShipping && (
            <tr>
              <th>Shipping</th>
              <td>
                <TaxedMoney taxedMoney={shippingTaxedPrice} gross />
              </td>
            </tr>
          )}

          {isDiscount && (
            <tr>
              <th>Discount</th>
              <td>
                <TaxedMoney taxedMoney={discountTaxedPrice} gross />
              </td>
            </tr>
          )}

          <tr className={styles.total}>
            <th>Total</th>
            <td>
              <TaxedMoney taxedMoney={totalPrice} gross />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="d-grid">
        <Link href={paths.checkout}>
          <a className="btn btn-secondary">Proceed to Checkout</a>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
