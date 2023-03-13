import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import useMenuLink from "hooks/useMenuLink";

import styles from "./MenuButton.module.scss";

const MenuButton = () => {
  const openMenu = useMenuLink();

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={clsx("btn btn-sm", styles.button)}
        title="Menu"
        aria-controls="site-menu"
        onClick={openMenu}
      >
        <FontAwesomeIcon icon={icons.faBars} className={styles.icon} />
        <span className={styles.text}>{"Menu"}</span>
      </button>
    </div>
  );
};

export default MenuButton;
