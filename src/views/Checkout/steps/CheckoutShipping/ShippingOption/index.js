import clsx from "clsx";
import Money from "components/atoms/Money";
import Box from "components/organisms/Box";

import styles from "./ShippingOption.module.scss";

const ShippingOption = ({ shippingMethod, onClick, selected }) => {
  const description = getShippingMethodDescription(shippingMethod);

  return (
    <Box
      button
      type="button"
      onClick={onClick}
      className={clsx(styles.box, selected && styles.selected)}
    >
      <h4 className={styles.title}>{shippingMethod.name}</h4>

      {description && <p className={styles.text}>{description}</p>}

      <div className={styles.price}>
        <Money money={shippingMethod.price} />
      </div>
    </Box>
  );
};

export default ShippingOption;

const getShippingMethodDescription = (shippingMethod) => {
  if (shippingMethod.price.amount === 0) {
    return "This order qualifies for free delivery. We aim to ship your products within 3-5 business days.";
  }

  return null;
};
