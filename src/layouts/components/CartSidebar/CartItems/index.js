import { useCart } from "@saleor/sdk";
import Loader from "components/atoms/Loader";
import CartItem from "../CartItem";

import styles from "./CartItems.module.scss";

const CartItems = () => {
  const { loaded, items, removeItem, updateItem } = useCart();

  if (!loaded) return <Loader />;

  if (!items?.length) {
    return (
      <div className="alert alert-primary" role="alert">
        No products in the basket.
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.variant.id}>
          <CartItem
            quantity={item.quantity}
            variant={item.variant}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
