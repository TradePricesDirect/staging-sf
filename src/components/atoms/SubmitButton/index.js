import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";

const SubmitButton = ({ loading, children }) => {
  return (
    <button type="submit" className="btn btn-primary" disabled={loading}>
      {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : children}
    </button>
  );
};

export default SubmitButton;
