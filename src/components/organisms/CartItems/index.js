import { useMemo, useRef, useEffect } from "react";
import { useCart } from "@saleor/sdk";
import { groupCartItems } from "utils/cart";
import Loader from "components/atoms/Loader";
import CartRangeItem from "components/molecules/CartRangeItem";
import CartItem from "components/molecules/CartItem";

import styles from "./CartItems.module.scss";

const CartItems = ({ isCheckout }) => {
  const {
    loaded,
    items: cartItems,
    removeItem,
    removeItems,
    updateItem,
  } = useCart();

  const { items, ranges } = useMemo(
    () => groupCartItems(cartItems),
    [cartItems]
  );

  if (!loaded) return <Loader />;

  if (!cartItems?.length) {
    return (
      <div className="alert alert-primary" role="alert">
        No products in the basket.
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {ranges.map((range, index) => (
        <li key={`cart-item-${index}-${range.id}`}>
          <CartRangeItem
            range={range}
            onRemove={removeItem}
            onRemoveAll={removeItems}
            isCheckout={isCheckout}
          />
        </li>
      ))}

      {items.map(({ variant, quantity, totalPrice }, index) => (
        <li key={`cart-item-${index}-${variant.id}`}>
          <CartItem
            variant={variant}
            quantity={quantity}
            totalPrice={totalPrice}
            onRemove={() => removeItem(variant.id)}
            onUpdate={(quantity) => updateItem(variant.id, quantity)}
            isCheckout={isCheckout}
          />
        </li>
      ))}
    </ul>
  );
};

export default CartItems;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
