import clsx from "clsx";

import styles from "./StepProgressBar.module.scss";

const StepProgressBar = ({ step, maxStep, onClick }) => {
  return (
    <nav className={styles.wrap}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <button
            type="button"
            className={clsx(styles.link, step === 1 && styles.active)}
            onClick={() => onClick(1)}
          >
            Q1
          </button>
        </li>

        <li className={styles.line} />

        <li className={styles.listItem}>
          <button
            type="button"
            className={clsx(styles.link, step === 2 && styles.active)}
            onClick={() => onClick(2)}
            disabled={2 > maxStep}
          >
            Q2
          </button>
        </li>

        <li className={styles.line} />

        <li className={styles.listItem}>
          <button
            type="button"
            className={clsx(styles.link, step === 3 && styles.active)}
            onClick={() => onClick(3)}
            disabled={3 > maxStep}
          >
            Q3
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default StepProgressBar;
