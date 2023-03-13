import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import styles from "./Logo.module.scss";

const Logo: FC<{
  link?: boolean;
  className?: string;
}> = ({ link, className }) => {
  const image = (
    <img
      src="/branding/tpd-site-logo.png"
      alt="Trade Prices Direct"
      className={clsx(styles.logo, className)}
    />
  );

  return link ? (
    <Link href="/" className={styles.link}>
      {image}
    </Link>
  ) : (
    <>{image}</>
  );
};

export default Logo;
