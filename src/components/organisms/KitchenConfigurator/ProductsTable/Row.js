import { useState } from "react";
import { useAuth } from "@saleor/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import TaxedMoney from "components/molecules/TaxedMoney";
import QuantitySelector from "components/molecules/QuantitySelector";

import styles from "./ProductsTable.module.scss";

const Row = ({ product, loading, onAddToCart }) => {
  const { user } = useAuth();

  const [isSubmitting, setSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      if (isSubmitting) return;

      setSubmitting(true);

      await onAddToCart(product.variant.id, quantity);

      setSubmitting(false);
      setQuantity(1);
    } catch (error) {
      console.error(error);
      location.reload();
    }
  };

  return (
    <tr key={product.id}>
      <td className={styles.sku}>{product.variant.sku}</td>
      <td>{product.name}</td>

      {user ? (
        <>
          <td className={styles.shrink}>
            <TaxedMoney taxedMoney={product.variant.pricing.price} gross />
          </td>
          <td className={styles.shrink}>
            <QuantitySelector
              quantity={quantity}
              onUpdate={setQuantity}
              debounce={false}
              small
            />
          </td>
          <td className={styles.shrink}>
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn btn-sm btn-link"
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? (
                <FontAwesomeIcon icon={icons.faSpinner} spin />
              ) : (
                <span>ADD</span>
              )}
            </button>
          </td>
        </>
      ) : (
        <td colSpan={3}>
          <p className="m-0 text-muted">Please login to purchase.</p>
        </td>
      )}
    </tr>
  );
};

export default Row;
