import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";

const SubmitButton = ({ loading, type = "submit", children, ...props }) => {
  return (
    <button
      type="submit"
      className="btn btn-primary"
      disabled={loading}
      {...props}
    >
      {loading ? <FontAwesomeIcon icon={icons.faSpinner} spin /> : children}
    </button>
  );
};

export default SubmitButton;
