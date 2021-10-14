import { SUPPORT_PHONE } from "core/config";
import Icon from "./cta-call.svg";

import styles from "./CallToAction.module.scss";

const CallToAction = () => {
  return (
    <div className={styles.wrap}>
      <Icon className={styles.icon} />
      <h5 className={styles.title}>Get Help</h5>
      <p className={styles.text}>Speak to our customer support team</p>
      <a
        href={`tel:${SUPPORT_PHONE.replace(/ /g, "")}`}
        className={styles.link}
      >
        {SUPPORT_PHONE}
      </a>
    </div>
  );
};

export default CallToAction;
