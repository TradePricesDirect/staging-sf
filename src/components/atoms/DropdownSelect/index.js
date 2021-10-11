import ReactSelect from "react-select";

const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#03284c",
    primary25: "#f1f6f8",
    primary50: "#cee2eb",
    primary75: "#03284c",
  },
});

const DropdownSelect = ({ options, name, value, onChange }) => {
  return (
    <ReactSelect
      name={name}
      options={options}
      value={value}
      onChange={onChange}
      theme={customTheme}
    />
  );
};

export default DropdownSelect;
