import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import { useOverlay } from "contexts/OverlayContext";
import Logo from "components/atoms/Logo";

import styles from "./MenuHeader.module.scss";

const MenuHeader = () => {
  const overlay = useOverlay();

  return (
    <div className={styles.header}>
      <button
        type="button"
        className={clsx("btn btn-sm", styles.close)}
        aria-label="Close"
        title="Close"
        onClick={overlay.hide}
      >
        <FontAwesomeIcon icon={faTimes} />
        Close
      </button>

      <Logo className={styles.logo} />
    </div>
  );
};

export default MenuHeader;
