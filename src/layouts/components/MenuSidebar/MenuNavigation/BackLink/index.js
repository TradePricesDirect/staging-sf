import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { useOverlay } from "contexts/OverlayContext";

import styles from "./BackLink.module.scss";

const BackLink = () => {
  const overlay = useOverlay();

  return (
    <button
      type="button"
      className={styles.backLink}
      onClick={() => overlay.show("menu")}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      <span className="visually-hidden">Back</span>
    </button>
  );
};

export default BackLink;
