import Link from "next/link";
import _ from "lodash";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import useDisclosure from "hooks/useDisclosure";
import useLocalStorage from "hooks/useLocalStorage";
import Thumbnail from "components/molecules/Thumbnail";
import Money from "components/atoms/Money";
import TaxedMoney from "components/molecules/TaxedMoney";

import styles from "./CartRangeItem.module.scss";

const CartRangeItem = ({ range, onRemove, isCheckout }) => {
  const [metadata] = useLocalStorage("data_checkout_metadata");
  const custom = metadata?.[`${range.name} Paint to Order Colour`];

  const { isOpen, onToggle } = useDisclosure();

  const path = {
    pathname: paths.kitchenRange.replace("[slug]", range.slug),
    query: {
      door: range.door?.slug,
      cabinet: range.cabinets.length > 0 ? range.cabinets[0].slug : null,
      custom: custom,
    },
  };

  const totalPrice = {
    amount: _.sumBy(range.items, "totalPrice.gross.amount"),
    currency: "GBP",
  };

  let doorName = range.door.name;
  if (range.door.slug === "paint-to-order" && custom) {
    doorName += ` - ${custom}`;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <div className={styles.image}>
          <Thumbnail thumbnail={range.thumbnail} />
        </div>

        <div className={styles.content}>
          {isCheckout ? (
            <span className={styles.name}>{range.name}</span>
          ) : (
            <Link href={path}>
              <a className={styles.name}>{range.name}</a>
            </Link>
          )}

          <ul className={styles.variants}>
            <li className={styles.variant}>Door Colour: {doorName}</li>

            {range.cabinets.length > 0 && (
              <li className={styles.variant}>
                Cabinet Colour: {_.join(_.map(range.cabinets, "name"), ", ")}
              </li>
            )}
          </ul>

          <button type="button" onClick={onToggle} className={styles.toggle}>
            <FontAwesomeIcon
              icon={isOpen ? faMinus : faPlus}
              className="me-2"
            />
            View Products
          </button>

          <div className={styles.footer}>
            <div className={styles.price}>
              <Money money={totalPrice} />
            </div>

            {!isCheckout && (
              <Link href={path}>
                <a className="btn btn-sm">
                  <FontAwesomeIcon icon={faEdit} />
                  <span className="visually-hidden">Edit this item</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>

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
                  {range.items.map((item) => (
                    <tr key={`item-${item.variant.id}`}>
                      <td className={styles.shrink}>
                        <div className={styles.quantity}>{item.quantity}</div>
                      </td>
                      <td>{item.variant.product.name}</td>
                      <td className={clsx(styles.shrink, styles.price)}>
                        <TaxedMoney taxedMoney={item.totalPrice} gross />
                      </td>
                      {!isCheckout && (
                        <td className={styles.shrink}>
                          <button
                            onClick={() => onRemove(item.variant.id)}
                            type="button"
                            className="btn btn-sm text-danger py-0 px-1"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            <span className="visually-hidden">
                              Remove this item
                            </span>
                          </button>
                        </td>
                      )}
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

export default CartRangeItem;
