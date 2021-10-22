import clsx from "clsx";
import Box from "components/organisms/Box";
import { getPaymentGatewayInfo } from "views/Checkout/utils";

import styles from "./PaymentOption.module.scss";

const PaymentOption = ({ paymentGateway, onClick, selected }) => {
  const { label, description, icons } = getPaymentGatewayInfo(
    paymentGateway.id
  );

  return (
    <Box
      button
      type="button"
      onClick={onClick}
      className={clsx(styles.box, selected && styles.selected)}
    >
      <h4 className={styles.title}>{label}</h4>

      <p className={styles.text}>{description}</p>

      {icons && (
        <ul className={styles.icons}>
          {icons.map(({ url, alt }) => (
            <li key={url}>
              <img src={url} alt={alt} />
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default PaymentOption;
