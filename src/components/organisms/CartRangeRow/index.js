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

import styles from "./CartRangeRow.module.scss";

const CartRangeRow = ({ range, onRemove, onRemoveAll }) => {
  const { isOpen, onToggle } = useDisclosure();

  const [metadata] = useLocalStorage("data_checkout_metadata");
  const custom = metadata?.[`${range.name} Paint to Order Colour`];

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

  const items = _.sortBy(range.items, ["variant.product.name"]);

  const handleRemoveAll = () => {
    const ids = _.map(range.items, "variant.id");
    onRemoveAll(ids);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <div className="col-auto">
          <Link href={path}>
            <a className={styles.thumbnail}>
              <Thumbnail thumbnail={range.thumbnail} />
            </a>
          </Link>
        </div>

        <div className="col">
          <div className={styles.content}>
            <div className={styles.body}>
              <div className="row justify-content-between gx-4">
                <div className="col-12 col-sm">
                  <Link href={path}>
                    <a className={styles.name}>{range.name}</a>
                  </Link>

                  <ul className={styles.variants}>
                    <li className={styles.variant}>Door Colour: {doorName}</li>

                    {range.cabinets.length > 0 && (
                      <li className={styles.variant}>
                        Cabinet Colour:{" "}
                        {_.join(_.map(range.cabinets, "name"), ", ")}
                      </li>
                    )}
                  </ul>
                </div>
                <div className="col-12 col-sm-auto">
                  <div className={styles.subtotalPrice}>
                    <Money money={totalPrice} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <div className="row justify-content-between align-items-center gx-4">
                <div className="col-auto">
                  <button
                    type="button"
                    onClick={onToggle}
                    className="btn btn-sm btn-link"
                  >
                    <FontAwesomeIcon
                      icon={isOpen ? faMinus : faPlus}
                      className="me-2"
                    />
                    View Products
                  </button>
                </div>
                <div className="col-auto">
                  <Link href={path}>
                    <a className="btn btn-sm">
                      <FontAwesomeIcon icon={faEdit} />
                      <span className="visually-hidden">Edit this item</span>
                    </a>
                  </Link>

                  <button
                    onClick={handleRemoveAll}
                    type="button"
                    className="btn btn-sm text-danger"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span className="visually-hidden">Remove this item</span>
                  </button>
                </div>
              </div>
            </div>
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
                  {items.map((item) => (
                    <tr key={item.variant.id}>
                      <td className={styles.shrink}>
                        <div className={styles.quantity}>{item.quantity}</div>
                      </td>
                      <td>{item.variant.product.name}</td>
                      <td className={clsx(styles.shrink, styles.price)}>
                        <TaxedMoney taxedMoney={item.totalPrice} gross />
                      </td>
                      <td className={styles.shrink}>
                        <button
                          onClick={() => onRemove(item.variant.id)}
                          type="button"
                          className="btn btn-sm text-danger"
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

export default CartRangeRow;
