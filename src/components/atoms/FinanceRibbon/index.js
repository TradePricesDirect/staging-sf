import Link from "next/link";
import clsx from "clsx";
import paths from "core/paths";
import Ribbon from "./finance-ribbon.svg";

import styles from "./FinanceRibbon.module.scss";

const FinanceRibbon = ({ className }) => {
  return (
    <div className={clsx(styles.ribbon, className)}>
      <Link href={paths.finance}>
        <a>
          <Ribbon />
        </a>
      </Link>
    </div>
  );
};

export default FinanceRibbon;
