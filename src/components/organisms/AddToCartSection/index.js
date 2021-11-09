import { useEffect, useState } from "react";
import { useAuth, useCart } from "@saleor/sdk";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import { useOverlay } from "contexts/OverlayContext";
import { getAvailableQuantity } from "./stockHelpers";

import styles from "./AddToCartSection.module.scss";
import QuantitySelector from "components/molecules/QuantitySelector";

const AddToCartSection = ({
  variant,
  isAvailableForPurchase,
  availableForPurchase,
  onAdd = null,
}) => {
  const [adding, setAdding] = useState(false);
  const { user } = useAuth();
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

  const handleAddToCart = async () => {
    try {
      setAdding(true);

      await addItem(variant.id, quantity);

      overlay.show("cart");
      setAdding(false);
      setQuantity(1);
      if (onAdd) onAdd();
    } catch (error) {
      console.error(error);
      location.reload();
    }
  };

  if (!user) return null;

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
      <QuantitySelector
        quantity={quantity}
        onUpdate={setQuantity}
        debounce={false}
      />

      <button
        type="button"
        onClick={handleAddToCart}
        className={clsx("btn btn-primary", styles.button)}
        disabled={adding}
      >
        {adding ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <span>Add to Basket</span>
        )}
      </button>
    </div>
  );
};

export default AddToCartSection;
