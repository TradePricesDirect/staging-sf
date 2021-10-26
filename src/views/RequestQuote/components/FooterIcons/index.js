import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
              <a
                className={styles.link}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={styles.image}
                  src="/images/request-quote/cta-faqs.svg"
                />

                <h4 className={styles.title}>FAQ's</h4>
              </a>
            </motion.li>
            <motion.li variants={item}>
              <a
                className={styles.link}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={styles.image}
                  src="/images/request-quote/cta-chat.svg"
                />

                <h4 className={styles.title}>Start Live Chat</h4>
              </a>
            </motion.li>
            <motion.li variants={item}>
              <a
                className={styles.link}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={styles.image}
                  src="/images/request-quote/cta-call.svg"
                />

                <h4 className={styles.title}>Call Us</h4>
              </a>
            </motion.li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FooterIcons;
