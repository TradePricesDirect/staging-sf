import clsx from "clsx";
import styles from "./ProductMeta.module.scss";

const ProductMeta = ({ sku, quantityAvailable }) => {
  const inStock = quantityAvailable && quantityAvailable > 0;

  return (
    <ul className={styles.list}>
      {sku && (
        <li className={styles.sku}>
          SKU: <bdi>{sku}</bdi>
        </li>
      )}

      {quantityAvailable && (
        <li
          className={clsx(
            styles.stock,
            inStock ? styles.inStock : styles.outOfStock
          )}
        >
          {inStock ? "IN STOCK" : "OUT OF STOCK"}
        </li>
      )}
    </ul>
  );
};

export default ProductMeta;
