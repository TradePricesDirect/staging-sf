import clsx from "clsx";

import styles from "./PaymentMethod.module.scss";

const PaymentMethod = ({ name, onChange, selected, gateway }) => {
  return (
    <div className={styles.wrap}>
      <label className={clsx(styles.option, selected && styles.selected)}>
        <input
          type="radio"
          name="payment-method"
          checked={selected}
          onChange={onChange}
          className={styles.input}
        />

        <div className="row g-4">
          <div className="col-auto">
            <div className={clsx(styles.dot, selected && styles.selected)} />
          </div>
          <div className="col">
            <h4 className={styles.title}>{name}</h4>
          </div>
        </div>
      </label>

      {selected && gateway}
    </div>
  );
};

export default PaymentMethod;
