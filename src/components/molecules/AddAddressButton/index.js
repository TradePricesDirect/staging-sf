import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import Box from "components/organisms/Box";

import styles from "./AddAddressButton.module.scss";

const AddAddressButton = ({ onClick }) => {
  return (
    <Box
      button
      type="button"
      onClick={onClick}
      className={styles.button}
      center
    >
      <span className="btn">
        <FontAwesomeIcon icon={faPlus} className="me-2" />
        Add Address
      </span>
    </Box>
  );
};

export default AddAddressButton;
