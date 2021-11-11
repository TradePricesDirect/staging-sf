import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/pro-light-svg-icons";
import useDisclosure from "hooks/useDisclosure";

import styles from "./Accordion.module.scss";

const Accordion = ({ title, children, open = false }) => {
  const { isOpen, onToggle } = useDisclosure(open);

  return (
    <div className={styles.wrap}>
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen ? "true" : "false"}
          className={styles.heading}
        >
          {title}
          <FontAwesomeIcon
            icon={isOpen ? faMinus : faPlus}
            className={styles.icon}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            style={{ overflow: "hidden" }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className={styles.body}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
