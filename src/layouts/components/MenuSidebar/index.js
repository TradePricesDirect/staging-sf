import { useOverlay } from "contexts/OverlayContext";
import Drawer from "components/organisms/Drawer";
import MenuHeader from "./MenuHeader";
import MenuItems from "./MenuItems";
import MenuContactDetails from "./MenuContactDetails";
import MenuAccount from "./MenuAccount";

import styles from "./MenuSidebar.module.scss";

const MenuSidebar = ({ menus }) => {
  const overlay = useOverlay();

  const isOpen = ["menu", "kitchens", "bathrooms", "boilers"].includes(
    overlay.type
  );

  return (
    <Drawer isOpen={isOpen} position="left">
      <div className={styles.wrap}>
        <MenuHeader />

        <div className={styles.body}>
          <MenuItems menus={menus} />

          <MenuContactDetails />

          <MenuAccount />
        </div>
      </div>
    </Drawer>
  );
};

export default MenuSidebar;
