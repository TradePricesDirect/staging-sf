import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faLockAlt,
  faTruck,
} from "@fortawesome/pro-light-svg-icons";

import styles from "./CallToActions.module.scss";

const CallToActions = () => {
  return (
    <div className={styles.wrap}>
      <div className="row gx-6">
        <div className="col-auto col-xxl">
          <div className={styles.cta}>
            <FontAwesomeIcon icon={faTruck} fixedWidth className="me-2" />
            <span>Fast Delivery Available</span>
          </div>
        </div>
        <div className="col-auto col-xxl">
          <div className={styles.cta}>
            <FontAwesomeIcon icon={faBoxOpen} fixedWidth className="me-2" />
            <span>Zero Hassle Returns</span>
          </div>
        </div>
        <div className="col-auto col-xxl">
          <div className={styles.cta}>
            <FontAwesomeIcon icon={faLockAlt} fixedWidth className="me-2" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActions;
