
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import { SUPPORT_PHONE, SUPPORT_EMAIL } from "core/config";

import styles from "./MenuContactDetails.module.scss";

const MenuContactDetails = () => {
  const tel = SUPPORT_PHONE.replace(/ /g, "");
  const email = SUPPORT_EMAIL;
  return (
    <ul className={styles.list}>
      <li>
        <a
          href={`tel:${tel}`}
          className={styles.link}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={icons.faPhone} />
          </span>
          <span className={styles.text}>
            {`${SUPPORT_PHONE}`}
          </span>
        </a>
      </li>
      <li>
        <a
          href={`mailto:${email}`}
          className={styles.link}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={icons.faEnvelope} />
          </span>
          <span className={styles.text}>
            {`${email}`}
          </span>
        </a>
      </li>
    </ul>
  )
};

export default MenuContactDetails;
