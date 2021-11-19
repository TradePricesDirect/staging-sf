import { useState } from "react";
import { useAuth, useCart } from "@saleor/sdk";
import { useOverlay } from "contexts/OverlayContext";
import { formatDate } from "utils/date";
import { getAvailableQuantity } from "utils/productStock";
import SubmitButton from "components/atoms/SubmitButton";

const AddToCartButton = ({
  variant,
  quantity = 1,
  isAvailableForPurchase,
  availableForPurchase,
}) => {
  const { user } = useAuth();
  const { addItem, items } = useCart();
  const overlay = useOverlay();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    await addItem(variant.id, quantity);

    overlay.show("cart");

    setLoading(false);
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
    <SubmitButton
      type="button"
      loading={loading}
      onClick={handleSubmit}
      className="btn btn-outline-primary"
    >
      Add To Basket
    </SubmitButton>
  );
};

export default AddToCartButton;
