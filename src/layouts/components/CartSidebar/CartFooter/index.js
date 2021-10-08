import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/pro-light-svg-icons";

import styles from "./CartFooter.module.scss";

const CartFooter = () => {
  return (
    <div className={styles.footer}>
      <h4>Get Help</h4>
      <p>Speak to our customer support team</p>

      <a
        href="tel:03333350439"
        className={clsx("btn btn-sm", styles.phoneButton)}
      >
        <FontAwesomeIcon icon={faPhoneAlt} />
        0333 335 0439
      </a>
    </div>
  );
};

export default CartFooter;
