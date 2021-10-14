import clsx from "clsx";

import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div
          className={clsx("spinner-border text-primary", styles.spinner)}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
