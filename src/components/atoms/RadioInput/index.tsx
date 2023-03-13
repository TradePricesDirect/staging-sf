import clsx from "clsx";
import { FC } from "react";
import styles from "./RadioInput.module.scss";

const RadioInput: FC<{
  label: any;
  name: any;
  defaultChecked?: boolean;
  register?: any;
  validation?: any;
  value?: string;
  error?: any;
}> = ({ label, name, register, validation, error, ...other }) => {
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

export default RadioInput;
