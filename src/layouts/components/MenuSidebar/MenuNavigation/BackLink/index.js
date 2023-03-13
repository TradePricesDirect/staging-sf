import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import { useOverlay } from "contexts/OverlayContext";

import styles from "./BackLink.module.scss";

const BackLink = () => {
  const overlay = useOverlay();
  const showParentMenu = () => overlay.show("menu");

  return (
    <div>
      <button
        type="button"
        className={styles.backLink}
        onClick={showParentMenu}
      >
        <FontAwesomeIcon icon={icons.faArrowLeft} />
        {/* <span className="visually-hidden">Back</span> */}
      </button>
    </div>
  );
};

export default BackLink;
