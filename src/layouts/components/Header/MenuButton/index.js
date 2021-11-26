import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";
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
        <FontAwesomeIcon icon={faBars} className={styles.icon} />
        Menu
      </button>
    </div>
  );
};

export default MenuButton;
