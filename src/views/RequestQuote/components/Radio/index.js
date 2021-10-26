import { faInfoCircle } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Radio.module.scss";

const Radio = ({ title, text, image, ...other }) => {
  const id = `${other.name}_${other.value}_radio`;

  return (
    <div className={styles.tile}>
      <input id={id} type="radio" className={styles.input} {...other} />
      <label className={styles.content} htmlFor={id}>
        <h3 className={styles.title}>
          {title} <FontAwesomeIcon icon={faInfoCircle} />
        </h3>

        <div className={styles.inner}>
          <p>{text}</p>

          <span className="btn btn-sm btn-circle">Select</span>
        </div>

        <img className={styles.icon} src={image} alt="" />
      </label>
    </div>
  );
};

export default Radio;
