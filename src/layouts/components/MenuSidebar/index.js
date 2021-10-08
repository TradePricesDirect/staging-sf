import { useOverlay } from "contexts/OverlayContext";
import Drawer from "components/organisms/Drawer";
import MenuHeader from "./MenuHeader";
import MenuItems from "./MenuItems";
import MenuContactDetails from "./MenuContactDetails";
import MenuAccount from "./MenuAccount";

import styles from "./MenuSidebar.module.scss";

const MenuSidebar = () => {
  const overlay = useOverlay();

  const isOpen = [
    "menu",
    "menu.kitchens",
    "menu.bathrooms",
    "menu.boilers",
  ].includes(overlay.type);

  return (
    <Drawer isOpen={isOpen} position="left">
      <div className={styles.wrap}>
        <MenuHeader />

        <div className={styles.body}>
          <MenuItems />

          <MenuContactDetails />

          <MenuAccount />
        </div>
      </div>
    </Drawer>
  );
};

export default MenuSidebar;
