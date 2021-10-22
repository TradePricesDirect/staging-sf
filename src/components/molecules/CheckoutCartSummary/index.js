import { useCart, useCheckout } from "@saleor/sdk";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/pro-regular-svg-icons";
import useDisclosure from "hooks/useDisclosure";
import pluralize from "utils/pluralize";
import TaxedMoney from "components/molecules/TaxedMoney";
import CartItems from "components/organisms/CartItems";

import styles from "./CheckoutCartSummary.module.scss";
import Box from "components/organisms/Box";

const CheckoutCartSummary = () => {
  const { checkout } = useCheckout();
  const { items, subtotalPrice, shippingPrice, discount, totalPrice } =
    useCart();

  const cartItemsQuantity = items?.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  const { isOpen, onToggle } = useDisclosure();

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? { gross: shippingPrice, net: shippingPrice }
      : null;

  const discountTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  const isShipping = !!shippingTaxedPrice?.gross;

  const isDiscount =
    !!discountTaxedPrice?.gross && discountTaxedPrice.gross.amount !== 0;

  return (
    <Box className={styles.box}>
      <header className={styles.header}>
        <div className="row">
          <div className="col">
            <h3 className={styles.title}>Basket Summary</h3>
            <p className={styles.count}>
              {pluralize(cartItemsQuantity, "item")}
            </p>
          </div>
          <div className="col-auto">
            <button type="button" className={styles.button} onClick={onToggle}>
              {isOpen ? "Collapse" : "Expand"}
              <FontAwesomeIcon
                icon={isOpen ? faAngleUp : faAngleDown}
                className="ms-2"
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.cartItems}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CartItems isCheckout />
          </motion.div>
        )}
      </AnimatePresence>

      <hr />

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
                {shippingTaxedPrice.gross.amount === 0 ? (
                  <span>Free</span>
                ) : (
                  <TaxedMoney taxedMoney={shippingTaxedPrice} gross />
                )}
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
    </Box>
  );
};

export default CheckoutCartSummary;
