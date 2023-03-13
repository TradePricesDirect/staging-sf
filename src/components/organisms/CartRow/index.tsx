import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import Thumbnail from "components/molecules/Thumbnail";
import QuantitySelector from "components/molecules/QuantitySelector";
import TaxedMoney from "components/molecules/TaxedMoney";
import { icons } from "core/constants";

import styles from "./CartRow.module.scss";

const CartRow = ({ variant, quantity, totalPrice, onRemove, onUpdate }) => {
  if (!variant.product) return null;

  return (
    <div className={styles.wrap}>
      <div className="col-auto">
        <Link
          href={paths.product.replace("[slug]", variant.product.slug)}
          className={styles.thumbnail}
        >
          <Thumbnail thumbnail={variant.product.thumbnail} />
        </Link>
      </div>

      <div className="col">
        <div className={styles.content}>
          <div className={styles.body}>
            <div className="row justify-content-between gx-4">
              <div className="col-12 col-sm">
                <Link
                  href={paths.product.replace("[slug]", variant.product.slug)}
                  className={styles.name}
                >
                  {variant.product.name}
                </Link>

                <p className={styles.sku}>{variant.sku}</p>

                <ul className={styles.variants}>
                  {variant.attributes.map(({ attribute, values }) => (
                    <li key={attribute.id} className={styles.variant}>
                      {attribute.name}:{" "}
                      <span>
                        {values.map((value) => value.name).join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-12 col-sm-auto">
                <div className={styles.pricing}>
                  <div className={styles.subtotalPrice}>
                    <TaxedMoney taxedMoney={totalPrice} gross />
                  </div>

                  {quantity > 1 && (
                    <div className={styles.unitPrice}>
                      <TaxedMoney
                        taxedMoney={variant.pricing.price}
                        gross
                        suffix="per item"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <div className="row justify-content-between align-items-center gx-4">
              <div className="col-auto">
                <QuantitySelector quantity={quantity} onUpdate={onUpdate} />
              </div>
              <div className="col-auto">
                <button
                  onClick={onRemove}
                  type="button"
                  className="btn btn-sm text-danger"
                >
                  <FontAwesomeIcon icon={icons.faTrash} />
                  <span className="visually-hidden">Remove this item</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartRow;
