import { motion } from "framer-motion";

import styles from "./ProductTileSkeleton.module.scss";

const ProductTileSkeleton = () => {
  const animate = { backgroundColor: ["#e9ecef", "#ced4da"] };
  const transition = { repeat: Infinity, repeatType: "reverse", duration: 1 };

  return (
    <div className={styles.skeleton}>
      <motion.div
        animate={animate}
        transition={transition}
        className={styles.image}
      >
        <div className={styles.imageInner} />
      </motion.div>
      <motion.div
        animate={animate}
        transition={transition}
        style={{ height: 40, marginBottom: 8 }}
      />
      <motion.div
        animate={animate}
        transition={transition}
        style={{ height: 32, width: "25%", marginBottom: 8 }}
      />
      <motion.div
        animate={animate}
        transition={transition}
        style={{ height: 50, width: "100%" }}
      />
    </div>
  );
};

export default ProductTileSkeleton;
