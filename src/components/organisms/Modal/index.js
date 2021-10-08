import { useEffect } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import ClientOnlyPortal from "components/organisms/ClientOnlyPortal";

import styles from "./Modal.module.scss";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size,
  target = "#overlay-root",
}) => {
  // Lock scroll on open
  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(document.querySelector(target));
    } else {
      clearAllBodyScrollLocks();
    }
  }, [isOpen]);

  return (
    <ClientOnlyPortal selector={target}>
      <AnimatePresence>
        {isOpen && (
          <div className={styles.wrap}>
            <motion.section
              className={clsx(styles.modal, size && styles[size])}
              role="dialog"
              aria-modal="true"
              tabIndex="-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {title && (
                <header className={styles.header}>
                  <h2 className={styles.title}>{title}</h2>
                  <button
                    type="button"
                    onClick={onClose}
                    className={clsx("btn-close", styles.closeButton)}
                    aria-label="Close"
                  >
                    <span className="visually-hidden">Close</span>
                  </button>
                </header>
              )}

              <div className={styles.content}>{children}</div>
            </motion.section>

            <motion.div
              className={styles.overlay}
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
          </div>
        )}
      </AnimatePresence>
    </ClientOnlyPortal>
  );
};

export default Modal;
