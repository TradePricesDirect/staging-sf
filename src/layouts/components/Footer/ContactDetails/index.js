import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneAlt } from "@fortawesome/pro-light-svg-icons";
import { SUPPORT_PHONE, SUPPORT_EMAIL } from "core/config";

import styles from "./ContactDetails.module.scss";

const ContactDetails = () => {
  return (
    <>
      <h3 className={styles.title}>Contact</h3>

      <ul className={styles.details}>
        <li>
          <a
            href={`tel:${SUPPORT_PHONE.replace(/ /g, "")}`}
            className="btn btn-sm"
          >
            <FontAwesomeIcon icon={faPhoneAlt} />
            {SUPPORT_PHONE}
          </a>
        </li>
        <li>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="btn btn-sm">
            <FontAwesomeIcon icon={faEnvelope} />
            Email us
          </a>
        </li>
      </ul>
    </>
  );
};

export default ContactDetails;
