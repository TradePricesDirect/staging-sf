import { useEffect, useState } from "react";
import { useCart } from "@saleor/sdk";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/pro-light-svg-icons";
import { useOverlay } from "contexts/OverlayContext";
import { getAvailableQuantity } from "./stockHelpers";

import styles from "./AddToCartSection.module.scss";

const AddToCartSection = ({
  variant,
  isAvailableForPurchase,
  availableForPurchase,
  onAdd = null,
}) => {
  const { addItem, items } = useCart();
  const overlay = useOverlay();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [variant]);

  // Max available quantitiy
  const availableQuantity = getAvailableQuantity(variant, items);

  // Out of stock
  const isOutOfStock = variant.quantityAvailable === 0;

  // Product not available
  const noPurchaseAvailable = !isAvailableForPurchase && !availableForPurchase;

  // Product available soon
  const purchaseAvailableDate =
    !isAvailableForPurchase &&
    availableForPurchase &&
    Date.parse(availableForPurchase);

  const minusQuantity = () => {
    setQuantity(Math.max(quantity - 1, 1));
  };

  const plusQuantity = () => {
    setQuantity(Math.min(quantity + 1, availableQuantity));
  };

  const handleAddToCart = () => {
    addItem(variant.id, quantity);
    overlay.show("cart");
    if (onAdd) onAdd();
  };

  if (isOutOfStock) {
    return (
      <p className={styles.message}>This product is currently out of stock.</p>
    );
  }

  if (availableQuantity === 0) {
    return (
      <p className={styles.message}>
        You cannot purchase anymore of this product.
      </p>
    );
  }

  if (noPurchaseAvailable) {
    return (
      <p className={styles.message}>
        This product is currently not available for purchase.
      </p>
    );
  }

  if (purchaseAvailableDate) {
    const dateFormat = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(purchaseAvailableDate);

    return (
      <p className={styles.message}>
        This product will become available for purchase on {dateFormat}.
      </p>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.quantitySelector}>
        <button
          type="button"
          onClick={minusQuantity}
          className={styles.quantityIncrement}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>

        <div className={styles.quantity}>
          {quantity.toString().padStart(2, "0")}
        </div>

        <button
          type="button"
          onClick={plusQuantity}
          className={styles.quantityIncrement}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className={clsx("btn btn-primary", styles.button)}
      >
        Add to Basket
      </button>
    </div>
  );
};

export default AddToCartSection;
