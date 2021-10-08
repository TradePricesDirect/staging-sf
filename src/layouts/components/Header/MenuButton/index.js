import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";
import { useOverlay } from "contexts/OverlayContext";

import styles from "./MenuButton.module.scss";

const MenuButton = () => {
  const overlay = useOverlay();

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={clsx("btn btn-sm", styles.button)}
        title="Menu"
        aria-controls="site-menu"
        onClick={() => overlay.show("menu")}
      >
        <FontAwesomeIcon icon={faBars} className={styles.icon} />
        Menu
      </button>
    </div>
  );
};

export default MenuButton;
