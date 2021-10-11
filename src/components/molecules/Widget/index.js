import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/pro-light-svg-icons";

import styles from "./Widget.module.scss";

const Widget = ({ title, isOpen, children }) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <section className={styles.widget}>
      <h3 className={styles.title} onClick={() => setOpen(!open)}>
        {title}
        <FontAwesomeIcon icon={open ? faMinus : faPlus} />
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            style={{ overflow: "hidden" }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Widget;
