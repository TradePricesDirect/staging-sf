import clsx from "clsx";
import Money from "components/atoms/Money";
import styles from "./ShippingOption.module.scss";

const ShippingOption = ({ shippingMethod, onChange, selected }) => {
  return (
    <label className={clsx(styles.wrap, selected && styles.selected)}>
      <input
        type="radio"
        name="shippingMethod"
        checked={selected}
        onChange={onChange}
        className={styles.input}
      />

      <div className="row g-4">
        <div className="col-auto">
          <div className={clsx(styles.dot, selected && styles.selected)} />
        </div>
        <div className="col">
          <h4 className={styles.title}>{shippingMethod.name}</h4>

          <Money money={shippingMethod.price} />
        </div>
      </div>
    </label>
  );
};

export default ShippingOption;
