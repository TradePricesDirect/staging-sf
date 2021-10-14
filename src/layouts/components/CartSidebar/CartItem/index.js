import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/pro-light-svg-icons";
import Money from "components/atoms/Money";
import Thumbnail from "components/molecules/Thumbnail";
import { useShop } from "contexts/ShopContext";

import styles from "./CartItem.module.scss";

const CartItem = ({ quantity, variant, removeItem, updateItem }) => {
  const { displayGrossPrices } = useShop();

  const [value, setValue] = useState(quantity);

  const debounced = useDebouncedCallback(updateItem, 300);

  useEffect(() => {
    if (value !== quantity) {
      if (value < 1) removeItem(variant.id);
      else debounced(variant.id, value);
    }
  }, [value]);

  const unitPrice = variant.pricing.price[displayGrossPrices ? "net" : "gross"];

  return (
    <div className={styles.wrap}>
      <div className={styles.image}>
        <Thumbnail thumbnail={variant.product.thumbnail} />
      </div>

      <div className={styles.content}>
        <h5 className={styles.name}>{variant.product.name}</h5>

        <ul className={styles.variants}>
          {variant.attributes.map(({ attribute, values }) => (
            <li key={attribute.id} className={styles.variant}>
              {attribute.name}:{" "}
              <span>{values.map((value) => value.name).join(", ")}</span>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <div className={styles.price}>
            <Money money={unitPrice} />
          </div>

          <button
            onClick={() => removeItem(variant.id)}
            type="button"
            className="btn btn-sm text-danger"
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className="visually-hidden">Remove this item</span>
          </button>
        </div>
      </div>

      <div className={styles.quantitySelector}>
        <button
          type="button"
          onClick={() => setValue((prevValue) => prevValue - 1)}
          className={styles.minus}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>

        <div className={styles.quantity}>
          {value.toString().padStart(2, "0")}
        </div>

        <button
          type="button"
          onClick={() => setValue((prevValue) => prevValue + 1)}
          className={styles.plus}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
