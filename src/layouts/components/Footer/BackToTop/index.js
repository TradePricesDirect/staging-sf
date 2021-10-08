import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/pro-solid-svg-icons";

import styles from "./BackToTop.module.scss";

const BackToTop = () => {
  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.link}>
      <a href="/" onClick={handleBackToTop} className="btn btn-circle">
        Back to top <FontAwesomeIcon icon={faArrowUp} />
      </a>
    </div>
  );
};

export default BackToTop;
