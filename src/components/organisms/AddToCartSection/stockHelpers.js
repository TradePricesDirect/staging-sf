/**
 * Returns how many items you can add to the cart.
 * Takes in account quantity already in cart.
 */
export const getAvailableQuantity = (variant, items) => {
  const { id, trackInventory, quantityAvailable } = variant;

  if (!trackInventory) return 1000;

  const cartItem = items?.find((item) => item.variant.id === id);
  const quantityInCart = cartItem?.quantity || 0;

  return quantityAvailable - quantityInCart;
};
