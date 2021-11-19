import clsx from "clsx";
import Ribbon from "./finance-ribbon.svg";

import styles from "./FinanceRibbon.module.scss";

const FinanceRibbon = ({ className }) => {
  return (
    <div className={clsx(styles.ribbon, className)}>
      <Ribbon />
    </div>
  );
};

export default FinanceRibbon;
