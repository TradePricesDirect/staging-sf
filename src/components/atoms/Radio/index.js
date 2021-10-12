const Radio = ({
  label,
  name,
  register,
  validation,
  error,
  helpText,
  ...other
}) => {
  return (
    <div className="mb-4">
      <div className="form-check">
        <input
          type="radio"
          id={`${name}_${other.value}_radio`}
          className="form-check-input"
          placeholder={label}
          {...register(name, validation)}
          {...other}
        />
        <label
          className="form-check-label"
          htmlFor={`${name}_${other.value}_radio`}
        >
          {label}
        </label>
      </div>
      {helpText && <div className="form-text">{helpText}</div>}
    </div>
  );
};

export default Radio;
