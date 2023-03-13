import { useOverlay } from "contexts/OverlayContext";
import Drawer from "components/organisms/Drawer";
import MenuHeader from "./MenuHeader";
import MenuNavigation from "./MenuNavigation";
import MenuContactDetails from "./MenuContactDetails";
import MenuAccount from "./MenuAccount";
import MenuBack from "./MenuBack";

import styles from "./MenuSidebar.module.scss";
import clsx from "clsx";
import useKeyPress from "hooks/useKeyPress";
import { FC, useEffect } from "react";

const MenuSidebar: FC<{
  categories: any;
  featuredCategories: any;
  className?: string;
}> = ({ categories, featuredCategories, className }) => {
  const overlay = useOverlay();
  const escapePress = useKeyPress("Escape");

  const visible = overlay.type !== null;

  useEffect(() => {
    if (escapePress) {
      overlay.hide();
    }
  }, [escapePress, overlay]);

  const isParent = overlay.type === "menu";

  const isOpen: boolean = ["menu", ...featuredCategories].includes(
    overlay.type
  );

  return (
    <Drawer isOpen={isOpen} position="left">
      <div className={clsx(styles.wrap, className)}>
        <MenuHeader />
        {!isParent && <MenuBack />}
        <div className={styles.body}>
          <MenuNavigation
            categories={categories}
            featuredCategories={featuredCategories}
            sidebar
          />
        </div>
        <MenuAccount />
      </div>
    </Drawer>
  );
};

export default MenuSidebar;
