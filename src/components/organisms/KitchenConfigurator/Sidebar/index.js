import { useMemo } from "react";
import Link from "next/link";
import { useCart } from "@saleor/sdk";
import _ from "lodash";
import clsx from "clsx";
import paths from "core/paths";
import { filterCartByVariants, getColorBySlug } from "../utils";

import styles from "./Sidebar.module.scss";

const Sidebar = ({ colors, onColorToggle }) => {
  const cart = useCart();

  const doorColor = getColorBySlug(colors.door);
  const cabinetColor = getColorBySlug(colors.cabinet);

  const items = useMemo(
    () => cart.items,
    // () => filterCartByVariants(cart.items, colors),
    [cart.items, colors]
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
