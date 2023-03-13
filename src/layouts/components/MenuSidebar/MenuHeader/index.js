import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import { useOverlay } from "contexts/OverlayContext";
import Logo from "components/atoms/Logo";

import styles from "./MenuHeader.module.scss";

const MenuHeader = () => {
  const overlay = useOverlay();

  return (
    <div className={styles.header}>
      <button
        type="button"
        className={clsx(styles.close)}
        aria-label="Close"
        title="Close"
        onClick={overlay.hide}
      >
        <FontAwesomeIcon icon={icons.faTimes} />
      </button>
      <div>
        <Logo link />
      </div>
    </div>
  );
};

export default MenuHeader;
