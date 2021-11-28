import { useMemo } from "react";
import Link from "next/link";
import { useCart } from "@saleor/sdk";
import _ from "lodash";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import useDisclosure from "hooks/useDisclosure";
import TaxedMoney from "components/molecules/TaxedMoney";
import AddRangeToWishlist from "components/molecules/AddRangeToWishlist";
import {
  filterCartByRange,
  groupItemsByCategory,
  getColorBySlug,
} from "../utils";

import styles from "./Sidebar.module.scss";

const Sidebar = ({ title, slug, colors, onColorToggle }) => {
  const { items } = useCart();
  const { isOpen, onToggle } = useDisclosure(true);

  const doorColor = getColorBySlug(colors.door);
  const cabinetColor = getColorBySlug(colors.cabinet);

  const cartItems = useMemo(
    () => filterCartByRange(items, slug, colors),
    [items, colors]
  );

  const categories = useMemo(
    () => groupItemsByCategory(cartItems),
    [cartItems]
  );

  if (!doorColor || !cabinetColor) return null;

  return (
    <section className={styles.wrap}>
      <h2 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen ? "true" : "false"}
          className={styles.heading}
        >
          Your Selection
          <FontAwesomeIcon
            icon={isOpen ? faAngleUp : faAngleDown}
            className={styles.icon}
          />
        </button>
      </h2>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            style={{ overflow: "hidden" }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className={styles.inner}>
              {doorColor && cabinetColor && (
                <div className={styles.tableWrap}>
                  <table
                    className={clsx(
                      "table table-sm table-borderless",
                      styles.table
                    )}
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
                <CategoryGroup key={category.id} category={category} />
              ))}

              {items?.length > 0 && (
                <footer>
                  <Link href={paths.checkout}>
                    <a className="btn btn-primary me-4">Continue Shopping</a>
                  </Link>

                  <AddRangeToWishlist
                    range={{ name: title, items: cartItems }}
                    className={clsx(
                      "btn btn-sm text-primary",
                      styles.wishlistButton
                    )}
                  />
                </footer>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

const CategoryGroup = ({ category }) => {
  const { isOpen, onToggle } = useDisclosure(true);

  return (
    <div className={styles.group}>
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen ? "true" : "false"}
          className={styles.subtitle}
        >
          {category.name}
          <FontAwesomeIcon
            icon={isOpen ? faAngleUp : faAngleDown}
            className={styles.icon}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            style={{ overflow: "hidden" }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className={styles.tableWrap}>
              <table
                className={clsx(
                  "table table-sm table-borderless",
                  styles.table
                )}
              >
                <tbody>
                  {category.items.map((item) => (
                    <tr key={item.variant.id}>
                      <td className={styles.shrink}>
                        <div className={styles.quantity}>{item.quantity}</div>
                      </td>
                      <td>{item.variant.product.name}</td>
                      <td className={clsx(styles.shrink, styles.price)}>
                        <TaxedMoney
                          taxedMoney={item.variant.pricing.price}
                          gross
                        />
                      </td>
                      <td className={styles.shrink}>
                        <button
                          onClick={() => removeItem(item.variant.id)}
                          type="button"
                          className="btn btn-sm text-danger py-0 px-1"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          <span className="visually-hidden">
                            Remove this item
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
