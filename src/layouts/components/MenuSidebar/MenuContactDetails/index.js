import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneAlt } from "@fortawesome/pro-light-svg-icons";
import { SUPPORT_PHONE, SUPPORT_EMAIL } from "core/config";

import styles from "./MenuContactDetails.module.scss";

const MenuContactDetails = () => {
  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        <li>
          <a
            href={`tel:${SUPPORT_PHONE.replace(/ /g, "")}`}
            className={clsx("btn btn-sm", styles.link)}
          >
            <FontAwesomeIcon icon={faPhoneAlt} />
            {SUPPORT_PHONE}
          </a>
        </li>
        <li>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
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
