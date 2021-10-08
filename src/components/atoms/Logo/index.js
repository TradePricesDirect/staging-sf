import clsx from "clsx";
import Link from "next/link";

import styles from "./Logo.module.scss";

export default function Logo(props) {
  return (
    <Link href="/">
      <a>
        <img
          src="/branding/tpd-site-logo.svg"
          alt="Trade Prices Direct"
          className={clsx(styles.logo, props.className)}
        />
      </a>
    </Link>
  );
}
