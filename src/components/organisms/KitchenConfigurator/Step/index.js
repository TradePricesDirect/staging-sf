import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/pro-light-svg-icons";

import styles from "./Step.module.scss";

const Step = ({ title, children, open, onToggle }) => {
  return (
    <div className={styles.wrap}>
      <h2 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open ? "true" : "false"}
          className={styles.heading}
        >
          {title}
          <FontAwesomeIcon
            icon={open ? faAngleUp : faAngleDown}
            className={styles.icon}
          />
        </button>
      </h2>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            style={{ overflow: "hidden" }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Step;
