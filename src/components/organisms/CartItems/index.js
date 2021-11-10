import { useMemo } from "react";
import { useCart } from "@saleor/sdk";
import { groupCartItems } from "utils/cart";
import Loader from "components/atoms/Loader";
import CartRangeItem from "components/molecules/CartRangeItem";
import CartItem from "components/molecules/CartItem";

import styles from "./CartItems.module.scss";

const CartItems = ({ isCheckout }) => {
  const { loaded, items: cartItems, removeItem, updateItem } = useCart();

  if (!loaded) return <Loader />;

  if (!cartItems?.length) {
    return (
      <div className="alert alert-primary" role="alert">
        No products in the basket.
      </div>
    );
  }

  const { items, ranges } = useMemo(
    () => groupCartItems(cartItems),
    [cartItems]
  );

  return (
    <ul className={styles.list}>
      {ranges.map((range, index) => (
        <li key={`cart-item-${index}-${range.id}`}>
          <CartRangeItem
            range={range}
            onRemove={removeItem}
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
