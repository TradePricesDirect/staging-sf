import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/pro-light-svg-icons";
import { SUPPORT_PHONE } from "core/config";

import styles from "./CartFooter.module.scss";

const CartFooter = () => {
  return (
    <div className={styles.footer}>
      <h4>Get Help</h4>
      <p>Speak to our customer support team</p>

      <a
        href={`tel:${SUPPORT_PHONE.replace(/ /g, "")}`}
        className={clsx("btn btn-sm", styles.phoneButton)}
      >
        <FontAwesomeIcon icon={faPhoneAlt} />
        {SUPPORT_PHONE}
      </a>
    </div>
  );
};

export default CartFooter;
