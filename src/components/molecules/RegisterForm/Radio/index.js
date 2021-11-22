import clsx from "clsx";
import styles from "./Radio.module.scss";

const Radio = ({ label, name, register, validation, error, ...other }) => {
  return (
    <div className="mb-4">
      <input
        type="radio"
        id={`${name}_${other.value}_radio`}
        className={clsx(styles.input, error && styles.error)}
        placeholder={label}
        {...register(name, validation)}
        {...other}
      />
      <label className={styles.label} htmlFor={`${name}_${other.value}_radio`}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
