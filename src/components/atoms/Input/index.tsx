import clsx from "clsx";
import { FC } from "react";

const Input: FC<{
  label: string;
  name: string;
  type?: string;
  register: any;
  autoComplete?: string;
  validation: any;
  error: any;
  helpText?: any;
}> = ({ label, name, register, validation, error, helpText, ...other }) => {
  return (
    <div className="mb-4 text-start">
      <div className="form-floating">
        <input
          id={`${name}_input`}
          className={clsx("form-control", error && "is-invalid")}
          placeholder={label}
          {...register(name, validation)}
          {...other}
        />
        <label htmlFor={`${name}_input`}>{label}</label>
      </div>
      {error && <div className="form-text text-danger">{error.message}</div>}
      {helpText && <div className="form-text">{helpText}</div>}
    </div>
  );
};

export default Input;
