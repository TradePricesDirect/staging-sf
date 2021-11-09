import ReactSelect from "react-select";
import _ from "lodash";

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

const DropdownSelect = (props) => {
  return (
    <ReactSelect
      {...props}
      value={_.find(props.options, ["value", props.value])}
      theme={customTheme}
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
    />
  );
};

export default DropdownSelect;
