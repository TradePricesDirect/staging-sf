import clsx from "clsx";

import styles from "./AddressOption.module.scss";

const AddressOption = ({ address, onChange, selected }) => {
  let title = `${address.firstName} ${address.lastName}`;
  if (address.companyName) title = `${title} | ${address.companyName}`;

  return (
    <label className={clsx(styles.wrap, selected && styles.selected)}>
      <input
        type="radio"
        name="addressOption"
        checked={selected}
        onChange={() => onChange(address)}
        className={styles.input}
      />
      <div className="row g-4">
        <div className="col-auto">
          <div className={clsx(styles.dot, selected && styles.selected)} />
        </div>
        <div className="col">
          <h4 className={styles.title}>{title}</h4>

          <address className={styles.address}>{formatAddress(address)}</address>

          <p className={styles.phone}>{address.phone}</p>
        </div>
      </div>
    </label>
  );
};

export default AddressOption;

const formatAddress = (address) => {
  const result = [
    address.streetAddress1,
    address.streetAddress2,
    address.city,
    address.postalCode,
  ].filter((item) => item);

  return result.join(", ");
};
