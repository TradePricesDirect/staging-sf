import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/pro-light-svg-icons";
import useDisclosure from "hooks/useDisclosure";

import styles from "./Step.module.scss";

const Step = ({ title, children, open = false }) => {
  const { isOpen, onToggle } = useDisclosure(open);

  return (
    <div className={styles.wrap}>
      <h2>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen ? "true" : "false"}
          className={styles.heading}
        >
          {title}
          <FontAwesomeIcon
            icon={isOpen ? faAngleUp : faAngleDown}
            className={styles.icon}
          />
        </button>
      </h2>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, overflow: "hidden" }}
            animate={{ height: "auto", overflow: "visible" }}
            exit={{ height: 0, overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Step;
