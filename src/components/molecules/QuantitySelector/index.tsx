import { useEffect, useState } from "react";
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
icons;

import styles from "./QuantitySelector.module.scss";
import { icons } from "core/constants";

const QuantitySelector = ({
  quantity,
  onUpdate,
  debounce = true,
  small = false,
}) => {
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
    <div className={clsx(styles.wrap, small ? styles.small : styles.large)}>
      <button
        type="button"
        onClick={() => setValue((prevValue) => Math.max(prevValue - 1, 1))}
        className={styles.button}
      >
        <FontAwesomeIcon icon={icons.faMinus} />
      </button>

      <div className={styles.quantity}>
        <span>{value.toString().padStart(2, "0")}</span>
      </div>

      <button
        type="button"
        onClick={() => setValue((prevValue) => prevValue + 1)}
        className={styles.button}
      >
        <FontAwesomeIcon icon={icons.faPlus} />
      </button>
    </div>
  );
};

export default QuantitySelector;
