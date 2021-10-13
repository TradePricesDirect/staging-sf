import clsx from "clsx";
import styles from "./FinanceRibbon.module.scss";

const FinanceRibbon = ({ className }) => {
  return (
    <div className={clsx(styles.ribbon, className)}>
      <span>Finance Options Available</span>
    </div>
  );
};

export default FinanceRibbon;
