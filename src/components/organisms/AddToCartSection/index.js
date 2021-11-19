import { useEffect, useState } from "react";
import { useAuth, useCart } from "@saleor/sdk";
import clsx from "clsx";
import { useOverlay } from "contexts/OverlayContext";
import { formatDate } from "utils/date";
import { getAvailableQuantity } from "utils/productStock";
import QuantitySelector from "components/molecules/QuantitySelector";
import AddToWishlist from "components/molecules/AddToWishlist";
import SubmitButton from "components/atoms/SubmitButton";

import styles from "./AddToCartSection.module.scss";

const AddToCartSection = ({
  product,
  variant,
  isAvailableForPurchase,
  availableForPurchase,
  onAdd = null,
}) => {
  const { user } = useAuth();
  const { addItem, items } = useCart();
  const overlay = useOverlay();

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [variant]);

  const handleAddToCart = async () => {
    try {
      if (loading) return;

      setLoading(true);

      await addItem(variant.id, quantity);

      overlay.show("cart");

      setLoading(false);

      setQuantity(1);

      if (onAdd) onAdd();
    } catch (error) {
      console.error(error);
      location.reload();
    }
  };

  // Max available quantitiy
  const availableQuantity = getAvailableQuantity(variant, items);

  // Out of stock
  const isOutOfStock = variant.quantityAvailable === 0;

  // Product available
  const canPurchase = isAvailableForPurchase && availableForPurchase;

  // Product available soon
  const canPurchaseDate =
    !isAvailableForPurchase &&
    availableForPurchase &&
    Date.parse(availableForPurchase);

  if (!user) return null;

  if (isOutOfStock) {
    return <p>This product is currently out of stock.</p>;
  }

  if (availableQuantity === 0) {
    return <p>You cannot purchase anymore of this product.</p>;
  }

  if (!canPurchase) {
    return <p>This product is currently not available for purchase.</p>;
  }

  if (canPurchaseDate) {
    const dateString = formatDate(canPurchaseDate);

    return (
      <p>This product will become available for purchase on {dateString}.</p>
    );
  }

  return (
    <div className={styles.wrap}>
      <QuantitySelector
        quantity={quantity}
        onUpdate={setQuantity}
        debounce={false}
      />

      <SubmitButton
        type="button"
        loading={loading}
        onClick={handleAddToCart}
        className={clsx("btn btn-primary", styles.button)}
      >
        Add To Basket
      </SubmitButton>

      <AddToWishlist
        name={product.name}
        product={product}
        variant={variant}
        className={clsx("btn btn-sm text-primary", styles.wishlistButton)}
      />
    </div>
  );
};

export default AddToCartSection;
