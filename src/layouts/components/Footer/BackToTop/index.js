import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";

import styles from "./BackToTop.module.scss";
import Link from "next/link";

const BackToTop = () => {
  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.link}>
      <Link href="/" onClick={handleBackToTop} className="btn btn-circle">
        {"Back to top"} <FontAwesomeIcon icon={icons.faArrowUp} />
      </Link>
    </div>
  );
};

export default BackToTop;
