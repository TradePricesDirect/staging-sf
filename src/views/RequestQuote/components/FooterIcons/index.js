import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SUPPORT_PHONE } from "core/config";
import paths from "core/paths";

import styles from "./FooterIcons.module.scss";

const container = {
  show: { transition: { staggerChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const FooterIcons = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (!visible) {
      timer = setTimeout(() => {
        setVisible(true);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.wrap}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <ul className={styles.list}>
            <motion.li variants={item}>
              <Link href={paths.about} className={styles.link}>
                <img
                  className={styles.image}
                  src="/images/request-quote/cta-FAQ.svg"
                />
                <h4 className={styles.title}>{"FAQ's"}</h4>
              </Link>
            </motion.li>
            <motion.li variants={item}>
              <span className={styles.link}>
                <img
                  className={styles.image}
                  src="/images/request-quote/cta-chat.svg"
                />
                <h4 className={styles.title}>{"Start Live Chat"}</h4>
              </span>
            </motion.li>
            <motion.li variants={item}>
              <Link
                className={styles.link}
                href={`tel:${SUPPORT_PHONE.replace(/ /g, "")}`}
              >
                <img
                  className={styles.image}
                  src="/images/request-quote/cta-call.svg"
                />

                <h4 className={styles.title}>{"Call Us"}</h4>
              </Link>
            </motion.li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FooterIcons;
