import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneAlt } from "@fortawesome/pro-light-svg-icons";

import styles from "./ContactDetails.module.scss";

const ContactDetails = () => {
  return (
    <>
      <h3 className={styles.title}>Contact</h3>

      <ul className={styles.details}>
        <li>
          <a href="tel:03333350439" className="btn btn-sm">
            <FontAwesomeIcon icon={faPhoneAlt} />
            0333 335 0439
          </a>
        </li>
        <li>
          <a href="mailto:hello@tradepricesdirect.com" className="btn btn-sm">
            <FontAwesomeIcon icon={faEnvelope} />
            Email us
          </a>
        </li>
      </ul>
    </>
  );
};

export default ContactDetails;
