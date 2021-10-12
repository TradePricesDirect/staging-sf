import { motion, AnimateSharedLayout } from "framer-motion";

import styles from "./NavPills.module.scss";

const NavPills = ({ values, activeIndex, onValueClick }) => {
  return (
    <AnimateSharedLayout>
      <ul className={styles.list} role="tablist">
        {values.map((value, index) => (
          <li key={value.id} role="presentation">
            <button
              type="button"
              className={styles.link}
              data-index="0"
              onClick={() => onValueClick(index)}
            >
              {value.name}
            </button>

            {index === activeIndex && (
              <motion.div
                layoutId="outline"
                className={styles.activeBg}
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>
    </AnimateSharedLayout>
  );
};

export default NavPills;
