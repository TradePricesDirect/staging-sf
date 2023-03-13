
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import { useOverlay } from "contexts/OverlayContext";


import styles from "./MenuBack.module.scss";

const MenuBack = () => {
  const overlay = useOverlay();
  const showParentMenu = () => overlay.show("menu");

  return (
    <button
      className={styles.header} type="button"
      aria-label="Back"
      title="Back"
      onClick={showParentMenu}>
      <div className={styles.close}>
        <FontAwesomeIcon icon={icons.faArrowLeft} />
      </div>
      <div className={styles.text}>
        <span>Return</span>
      </div>
    </button>
  );
};

export default MenuBack;
