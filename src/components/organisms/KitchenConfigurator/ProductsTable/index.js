import { useState } from "react";
import { useCart } from "@saleor/sdk";
import _ from "lodash";
import clsx from "clsx";
import Row from "./Row";

import styles from "./ProductsTable.module.scss";

const ProductsTable = ({
  products,
  category,
  subcategory,
  categories,
  subcategories,
  onCategoryChange,
  onSubcategoryChange,
  text,
}) => {
  const { addItem } = useCart();

  const [isSubmitting, setSubmitting] = useState(false);

  const handleAddToCart = async (id, quantity) => {
    try {
      if (isSubmitting) return;

      setSubmitting(true);

      await addItem(id, quantity);

      setSubmitting(false);
    } catch (error) {
      console.error(error);
      location.reload();
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {categories.map(({ id, name, slug }) => (
            <li key={id}>
              <button
                type="buton"
                className={clsx(
                  styles.button,
                  category === slug && styles.selected
                )}
                onClick={() => onCategoryChange(slug)}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {subcategories && (
        <nav className={styles.subNav}>
          <ul className={styles.list}>
            {subcategories.map(({ id, name, slug }) => (
              <li key={id}>
                <button
                  type="buton"
                  className={clsx(
                    styles.button,
                    subcategory === slug && styles.selected
                  )}
                  onClick={() => onSubcategoryChange(slug)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="py-4 p-md-4">
        {text && <p className={styles.lead}>{text}</p>}

        {!products.length ? (
          <p className="m-0 p-4 text-muted">
            Sorry, there are products available in this category.
          </p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={clsx("table table-borderless", styles.table)}>
              <thead>
                <tr>
                  <th className={styles.sku}>SKU</th>
                  <th>Title</th>
                  <th className={styles.shrink}>Retail Price</th>
                  <th className={styles.shrink}>Quantity</th>
                  <th className={styles.shrink}>Basket</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <Row
                    key={product.id}
                    product={product}
                    loading={isSubmitting}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsTable;
