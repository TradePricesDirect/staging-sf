import clsx from "clsx";
import { FormattedAddress } from "utils/address";
import Box from "components/organisms/Box";

import styles from "./AddressOption.module.scss";

const AddressOption = ({ address, onClick, selected }) => {
  let title = `${address.firstName} ${address.lastName}`;
  if (address.companyName) title = `${title} | ${address.companyName}`;

  return (
    <Box
      button
      type="button"
      onClick={onClick}
      className={clsx(styles.box, selected && styles.selected)}
    >
      <FormattedAddress address={address} />

      <p className={styles.phone}>{address.phone}</p>
    </Box>
  );
};

export default AddressOption;
