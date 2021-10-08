import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import ClientOnlyPortal from "components/organisms/ClientOnlyPortal";
import { useOverlay } from "contexts/OverlayContext";

import styles from "./Drawer.module.scss";

const variant = {
  hidden: (position) => ({ x: position === "right" ? "100%" : "-100%" }),
  visible: { x: 0 },
};

const Drawer = ({
  isOpen = true,
  onClose,
  children,
  position = "left",
  target = "#overlay-root",
}) => {
  const overlay = useOverlay();

  return (
    <ClientOnlyPortal selector={target}>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={clsx(styles.wrap, styles[position])}
              custom={position}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variant}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              tabIndex="-1"
            >
              {children}
            </motion.div>

            <motion.div
              className={styles.overlay}
              onClick={onClose || overlay.hide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
          </>
        )}
      </AnimatePresence>
    </ClientOnlyPortal>
  );
};

export default Drawer;
