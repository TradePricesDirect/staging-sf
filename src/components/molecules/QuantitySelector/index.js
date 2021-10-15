import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/pro-light-svg-icons";

import styles from "./QuantitySelector.module.scss";

const QuantitySelector = ({ quantity, onUpdate, debounce = true }) => {
  const [value, setValue] = useState(quantity);

  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const debounced = useDebouncedCallback(onUpdate, 300);

  useEffect(() => {
    if (value !== quantity) {
      if (debounce) debounced(value);
      else onUpdate(value);
    }
  }, [value]);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        onClick={() => setValue((prevValue) => Math.max(prevValue - 1, 1))}
        className={styles.button}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>

      <div className={styles.quantity}>{value.toString().padStart(2, "0")}</div>

      <button
        type="button"
        onClick={() => setValue((prevValue) => prevValue + 1)}
        className={styles.button}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default QuantitySelector;
