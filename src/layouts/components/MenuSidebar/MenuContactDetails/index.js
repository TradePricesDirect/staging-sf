import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneAlt } from "@fortawesome/pro-light-svg-icons";

import styles from "./MenuContactDetails.module.scss";

const MenuContactDetails = () => {
  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        <li>
          <a href="tel:03333350439" className={clsx("btn btn-sm", styles.link)}>
            <FontAwesomeIcon icon={faPhoneAlt} />
            0333 335 0439
          </a>
        </li>
        <li>
          <a
            href="mailto:hello@tradepricesdirect.com"
            className={clsx("btn btn-sm", styles.link)}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            Email us
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuContactDetails;
