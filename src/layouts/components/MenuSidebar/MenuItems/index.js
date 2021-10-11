import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useOverlay } from "contexts/OverlayContext";
import MainMenu from "./MainMenu";
import ChildMenu from "./ChildMenu";

import styles from "./MenuItems.module.scss";

const variant = {
  hidden: (isParent) => ({
    position: "absolute",
    visibility: "hidden",
    x: isParent ? "-15%" : "15%",
  }),
  visible: {
    position: "static",
    visibility: "visible",
    x: 0,
  },
};

const MenuItems = ({ menus }) => {
  const overlay = useOverlay();

  const isParent = overlay.type === "menu";

  return (
    <div className={styles.wrap}>
      {!isParent && (
        <button
          type="button"
          className={clsx("btn btn-sm", styles.backLink)}
          onClick={() => overlay.show("menu")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="visually-hidden">Back</span>
        </button>
      )}

      <AnimatePresence>
        <motion.div
          key={overlay.type}
          custom={isParent}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variant}
          transition={{ ease: "easeOut", duration: 0.2 }}
        >
          {isParent ? (
            <MainMenu menu={menus.main} />
          ) : (
            <ChildMenu menu={menus[overlay.type] || null} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MenuItems;
