const Checkbox = ({ label, name, register, validation, error, ...other }) => {
  return (
    <div className="form-check mb-4">
      <input
        type="checkbox"
        id={`${name}_${other.value}_checkbox`}
        className="form-check-input"
        placeholder={label}
        {...register(name, validation)}
        {...other}
      />
      <label
        className="form-check-label"
        style={error && { color: "red" }}
        htmlFor={`${name}_${other.value}_checkbox`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
