import { FC } from "react";
import styles from "./Pill.module.scss";

const Pill: FC<{ text: string }> = ({ text }) => {
  return (
    <div className={styles.container}>
      <span>{text}</span>
    </div>
  );
};

export default Pill;
