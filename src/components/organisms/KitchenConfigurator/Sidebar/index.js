import { useMemo } from "react";
import Link from "next/link";
import { useCart } from "@saleor/sdk";
import _ from "lodash";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import TaxedMoney from "components/molecules/TaxedMoney";
import { filterCartByVariants, getColorBySlug } from "../utils";

import styles from "./Sidebar.module.scss";

const Sidebar = ({ slug, colors, onColorToggle }) => {
  const { items, removeItem } = useCart();

  const doorColor = getColorBySlug(colors.door);
  const cabinetColor = getColorBySlug(colors.cabinet);

  const categories = useMemo(
    () => filterCartByVariants(items, slug, colors),
    [items, colors]
  );

  if (!doorColor || !cabinetColor) return null;

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>Your Selection</h2>

      {doorColor && cabinetColor && (
        <div className={styles.tableWrap}>
          <table
            className={clsx("table table-sm table-borderless", styles.table)}
          >
            <thead>
              <tr>
                <th colSpan={3}>Colour</th>
              </tr>
            </thead>
            <tbody>
              <ColorRow
                color={doorColor}
                suffix="Doors"
                onClick={onColorToggle}
              />

              <ColorRow
                color={cabinetColor}
                suffix="Cabinets"
                onClick={onColorToggle}
              />
            </tbody>
          </table>
        </div>
      )}

      {categories.map((category) => (
        <div key={category.id} className={styles.tableWrap}>
          <table
            className={clsx("table table-sm table-borderless", styles.table)}
          >
            <thead>
              <tr>
                <th colSpan={4}>{category.name}</th>
              </tr>
            </thead>
            <tbody>
              {category.items.map((item) => (
                <tr key={item.variant.id}>
                  <td className={styles.shrink}>
                    <div className={styles.quantity}>{item.quantity}</div>
                  </td>
                  <td>{item.variant.product.name}</td>
                  <td className={clsx(styles.shrink, styles.price)}>
                    <TaxedMoney taxedMoney={item.variant.pricing.price} gross />
                  </td>
                  <td className={styles.shrink}>
                    <button
                      onClick={() => removeItem(item.variant.id)}
                      type="button"
                      className="btn btn-sm text-danger py-0 px-1"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span className="visually-hidden">Remove this item</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <footer>
        <Link href={paths.checkout}>
          <a className="btn btn-primary">Proceed To Checkout</a>
        </Link>
      </footer>
    </section>
  );
};

export default Sidebar;

const ColorRow = ({ color, suffix, onClick }) => {
  return (
    <tr>
      <td>{`${color.name} ${suffix}`}</td>
      <td className={styles.shrink}>
        <div
          className={styles.colorSwatch}
          style={{ background: color.value }}
          data-color={color.slug}
        />
      </td>

      <td className={styles.shrink}>
        <button type="button" onClick={onClick} className={styles.button}>
          Change
        </button>
      </td>
    </tr>
  );
};
